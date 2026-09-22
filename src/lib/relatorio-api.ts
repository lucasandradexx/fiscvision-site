import { apenasDigitos } from "@/lib/cnpj";

/** Documento devolvido pelo agente: markdown + título. */
export type RelatorioDoc = {
  nomeDoc: string;
  conteudoDoc: string;
  /** dd/MM/yyyy — data em que a análise foi pedida */
  competencia: string;
};

export class RelatorioError extends Error {}

/** Chama o proxy interno, que por sua vez chama o webhook do n8n. */
export async function gerarRelatorio(
  cnpj: string,
  amostragemMeses: number,
  signal?: AbortSignal,
): Promise<RelatorioDoc> {
  const resposta = await fetch("/api/relatorio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cnpj: apenasDigitos(cnpj), amostragemMeses }),
    signal,
  });

  const corpo = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    const msg =
      corpo && typeof corpo.erro === "string"
        ? corpo.erro
        : "Não foi possível gerar o relatório. Tente novamente.";
    throw new RelatorioError(msg);
  }

  return corpo as RelatorioDoc;
}
