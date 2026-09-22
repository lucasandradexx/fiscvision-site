import { DocumentoMarkdown } from "@/components/documento-markdown";
import { rotuloPeriodo } from "@/lib/fiscvision-data";
import type { RelatorioDoc } from "@/lib/relatorio-api";

function Moldura({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-7 overflow-hidden rounded-2xl border border-line bg-white">
      {children}
    </div>
  );
}

function Vazio() {
  return (
    <Moldura>
      <div className="px-8 py-20 text-center">
        <div className="mx-auto size-11 rounded-xl bg-canvas" />
        <p className="mx-auto mt-5 max-w-[34em] text-[15px] leading-relaxed text-ink-faint">
          Nenhum relatório gerado ainda. Informe o CNPJ e o período acima para o
          agente consultar o Zen Fiscal e montar o documento.
        </p>
      </div>
    </Moldura>
  );
}

function Carregando() {
  const linhas = [
    "w-2/5",
    "w-full",
    "w-11/12",
    "w-4/5",
    "w-1/3",
    "w-full",
    "w-10/12",
    "w-9/12",
    "w-1/2",
  ];
  return (
    <Moldura>
      <div className="animate-pulse px-8 py-10 sm:px-12" aria-hidden="true">
        {linhas.map((largura, i) => (
          <div
            key={i}
            className={`mb-4 h-3.5 rounded-full bg-canvas ${largura} ${
              largura.startsWith("w-2/5") || largura === "w-1/3" ? "h-5" : ""
            }`}
          />
        ))}
      </div>
      <span className="sr-only">Gerando relatório…</span>
    </Moldura>
  );
}

function Erro({ mensagem }: { mensagem: string }) {
  return (
    <div className="mt-7 rounded-2xl border border-critico-dot/35 bg-critico-soft px-8 py-10 text-center">
      <p className="text-[15px] font-semibold text-critico">{mensagem}</p>
      <p className="mx-auto mt-2 max-w-[34em] text-[14px] text-ink-subtle">
        Confira o CNPJ e tente gerar o diagnóstico novamente.
      </p>
    </div>
  );
}

function baixarMarkdown(doc: RelatorioDoc) {
  const blob = new Blob([doc.conteudoDoc], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${doc.nomeDoc.replace(/[\/:*?"<>|]/g, "-")}.md`;
  link.click();
  URL.revokeObjectURL(url);
}

function Documento({ doc, periodo }: { doc: RelatorioDoc; periodo: number }) {
  return (
    <Moldura>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line-soft bg-[#fbfdfe] px-8 py-6 sm:px-12">
        <div className="min-w-0">
          <h3 className="text-[19px] font-bold tracking-[-0.01em] text-ink">
            {doc.nomeDoc}
          </h3>
          <div className="mt-1.5 font-mono text-[12.5px] text-ink-faint">
            gerado em {doc.competencia} · amostragem de {rotuloPeriodo(periodo)}
          </div>
        </div>
        <button
          type="button"
          onClick={() => baixarMarkdown(doc)}
          className="cursor-pointer rounded-[10px] border border-line px-4 py-2.5 text-[13px] font-semibold text-ink-muted transition-colors hover:border-teal hover:text-teal"
        >
          Baixar .md
        </button>
      </div>

      <article className="px-8 py-10 sm:px-12">
        <DocumentoMarkdown conteudo={doc.conteudoDoc} />
      </article>
    </Moldura>
  );
}

type Props = {
  doc: RelatorioDoc | null;
  carregando: boolean;
  erro: string | null;
  periodo: number;
};

export function Relatorio({ doc, carregando, erro, periodo }: Props) {
  return (
    <section
      id="relatorio"
      className="mx-auto max-w-[1140px] px-6 pt-[72px] pb-24"
    >
      <div className="text-xs font-bold tracking-[0.12em] text-teal uppercase">
        Documento do agente
      </div>
      <h2 className="mt-3 text-[32px] font-extrabold tracking-[-0.02em] text-ink">
        Relatório
      </h2>

      {carregando ? (
        <Carregando />
      ) : erro ? (
        <Erro mensagem={erro} />
      ) : doc ? (
        <Documento doc={doc} periodo={periodo} />
      ) : (
        <Vazio />
      )}

      {/*
        FEATURE FUTURA — painel visual do diagnóstico (cards de competência com
        semáforo, legenda e plano de ação priorizado). O código continua vivo e
        compilando em src/components/futuro/relatorio-semaforo.tsx, alimentado
        por MESES / ACOES / SEMAFORO em src/lib/fiscvision-data.ts.
        Para religar: importe RelatorioSemaforo e renderize aqui, abaixo do
        documento, passando os dados vindos do agente.
      */}
    </section>
  );
}
