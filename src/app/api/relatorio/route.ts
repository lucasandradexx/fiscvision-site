import { NextResponse } from "next/server";
import { competenciaHoje } from "@/lib/competencia";

const WEBHOOK =
  process.env.FISCVISION_WEBHOOK_URL ??
  "https://n8n.boramei.cloud/webhook/fiscvision";

/** O agente consulta CNPJ, NF-e, NFS-e e certidões: a resposta demora. */
const TIMEOUT_MS = 280_000;
export const maxDuration = 300;

type Entrada = { cnpj?: unknown; amostragemMeses?: unknown };

/** n8n devolve ora o objeto, ora um array de itens. */
function primeiroItem(payload: unknown): Record<string, unknown> | null {
  const item = Array.isArray(payload) ? payload[0] : payload;
  return item && typeof item === "object"
    ? (item as Record<string, unknown>)
    : null;
}

function texto(valor: unknown): string {
  return typeof valor === "string" ? valor : "";
}

/**
 * O agente pode devolver { conteudo_doc, nome_doc }, um array com esse objeto,
 * ou markdown puro. Aceita as três formas.
 */
function extrairDocumento(
  bruto: string,
): { conteudoDoc: string; nomeDoc: string } | null {
  const corpo = bruto.trim();
  if (!corpo) return null;

  let json: unknown;
  try {
    json = JSON.parse(corpo);
  } catch {
    // não era JSON: o próprio corpo é o markdown
    return { conteudoDoc: corpo, nomeDoc: "" };
  }

  if (typeof json === "string")
    return { conteudoDoc: json.trim(), nomeDoc: "" };

  const item = primeiroItem(json);
  if (!item) return null;

  const conteudoDoc = (
    texto(item.conteudo_doc) ||
    texto(item.doc) ||
    texto(item.output) ||
    texto(item.text)
  ).trim();

  if (!conteudoDoc) return null;
  return { conteudoDoc, nomeDoc: texto(item.nome_doc).trim() };
}

export async function POST(request: Request) {
  const entrada = (await request.json().catch(() => ({}))) as Entrada;

  const cnpj =
    typeof entrada.cnpj === "string" ? entrada.cnpj.replace(/\D/g, "") : "";
  const amostragem = Number(entrada.amostragemMeses);

  if (cnpj.length !== 14) {
    return NextResponse.json(
      { erro: "Informe um CNPJ com 14 dígitos." },
      { status: 400 },
    );
  }
  if (!Number.isInteger(amostragem) || amostragem < 1) {
    return NextResponse.json(
      { erro: "Período de amostragem inválido." },
      { status: 400 },
    );
  }

  const competencia = competenciaHoje();

  // Formato exigido pelo webhook: array com um item, chave "amostragem(meses)".
  const payload = [{ cnpj, competencia, "amostragem(meses)": amostragem }];

  let resposta: Response;
  try {
    resposta = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (erro) {
    const expirou = erro instanceof Error && erro.name === "TimeoutError";
    return NextResponse.json(
      {
        erro: expirou
          ? "A análise demorou mais que o esperado e foi interrompida."
          : "Não foi possível falar com o agente do FiscVision.",
      },
      { status: 504 },
    );
  }

  if (!resposta.ok) {
    return NextResponse.json(
      { erro: `O agente respondeu com erro (${resposta.status}).` },
      { status: 502 },
    );
  }

  const bruto = await resposta.text();
  const documento = extrairDocumento(bruto);

  if (!documento) {
    console.error(
      `[relatorio] webhook respondeu ${resposta.status} sem documento utilizável ` +
        `(${bruto.length} bytes): ${bruto.slice(0, 300)}`,
    );
    return NextResponse.json(
      {
        erro: bruto.trim()
          ? "O agente respondeu num formato inesperado."
          : "O agente respondeu vazio. Confira no n8n se o webhook está devolvendo o documento (nó “Respond to Webhook” com conteudo_doc).",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    nomeDoc: documento.nomeDoc || "Relatório",
    conteudoDoc: documento.conteudoDoc,
    competencia,
  });
}
