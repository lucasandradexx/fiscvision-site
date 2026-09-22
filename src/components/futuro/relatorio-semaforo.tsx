/* ---------------------------------------------------------------------------
 * FEATURE FUTURA — não renderizada hoje.
 *
 * Painel visual do diagnóstico: um card por competência com o semáforo fiscal,
 * a legenda e a tabela de plano de ação priorizado. Era o que ocupava a seção
 * "Amostra de relatório" antes dela passar a exibir o documento do agente.
 *
 * Está como código real (e não comentado) de propósito: assim continua passando
 * pelo TypeScript e pelo lint, e não apodrece enquanto espera. Como nada importa
 * este arquivo, ele fica de fora do bundle.
 *
 * Para religar: importe <RelatorioSemaforo /> em src/components/relatorio.tsx e
 * troque MESES/ACOES pelos dados estruturados que o agente vier a devolver.
 * ------------------------------------------------------------------------- */

import {
  ACOES,
  LEGENDA,
  MESES,
  SEMAFORO,
  type Mes,
} from "@/lib/fiscvision-data";

/* classes literais: o scanner do Tailwind não resolve strings montadas em runtime */
const COLUNAS =
  "grid-cols-[minmax(0,1.6fr)_minmax(0,0.7fr)_minmax(0,0.6fr)_minmax(0,0.6fr)]";
const COLUNAS_SM =
  "sm:grid-cols-[minmax(0,1.6fr)_minmax(0,0.7fr)_minmax(0,0.6fr)_minmax(0,0.6fr)]";

/** "competências de abril a setembro" — MESES vem do mais recente para o mais antigo. */
function intervaloCompetencias(meses: Mes[]): string {
  if (meses.length === 0) return "sem competências no período";
  const recente = meses[0].mes.toLowerCase();
  if (meses.length === 1) return `competência de ${recente}`;
  const antiga = meses[meses.length - 1].mes.toLowerCase();
  return `competências de ${antiga} a ${recente}`;
}

function Chip({ status }: { status: Mes["status"] }) {
  const sem = SEMAFORO[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${sem.chip}`}
    >
      <span className={`size-2 rounded-full ${sem.dot}`} />
      {sem.label}
    </span>
  );
}

function MesCard({ mes }: { mes: Mes }) {
  const contadores = [
    {
      valor: mes.regular,
      label: "Regular",
      box: "bg-regular-tint",
      num: "text-regular",
      cap: "text-regular-label",
    },
    {
      valor: mes.atencao,
      label: "Atenção",
      box: "bg-atencao-tint",
      num: "text-atencao",
      cap: "text-atencao-label",
    },
    {
      valor: mes.critico,
      label: "Crítico",
      box: "bg-critico-tint",
      num: "text-critico",
      cap: "text-critico-label",
    },
    {
      valor: mes.naoAnalisado,
      label: "N/A",
      box: "bg-na-tint",
      num: "text-na",
      cap: "text-na-label",
    },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5.5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[17px] font-bold text-ink">{mes.mes}</div>
          <div className="mt-0.5 font-mono text-xs text-ink-ghost">
            {mes.competencia}
          </div>
        </div>
        <Chip status={mes.status} />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {contadores.map((c) => (
          <div
            key={c.label}
            className={`rounded-[9px] px-2 py-2.5 text-center ${c.box}`}
          >
            <div className={`text-[19px] font-extrabold ${c.num}`}>
              {c.valor}
            </div>
            <div className={`mt-0.5 text-[10.5px] font-semibold ${c.cap}`}>
              {c.label}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-line-soft pt-3.5 text-[13.5px] leading-[1.55] text-ink-subtle">
        {mes.nota}
      </div>
    </div>
  );
}

type Props = {
  nomeCliente: string;
  cnpjExibido: string;
  periodo: number;
};

export function RelatorioSemaforo({
  nomeCliente,
  cnpjExibido,
  periodo,
}: Props) {
  const meses = MESES.slice(0, periodo);
  const competencias = new Set(meses.map((m) => m.competencia));
  const acoes = ACOES.filter((a) => competencias.has(a.competencia));
  const urgentes = acoes.filter(
    (a) => a.prazoDias !== null && a.prazoDias <= 15,
  ).length;

  return (
    <div className="pt-16">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h2 className="mb-1.5 text-[32px] font-extrabold tracking-[-0.02em] text-ink">
            {nomeCliente}
          </h2>
          <div className="font-mono text-[13px] text-ink-faint">
            CNPJ {cnpjExibido} · {intervaloCompetencias(meses)}
          </div>
        </div>
        <div className="flex flex-wrap gap-4.5 text-[13px] text-ink-muted">
          {LEGENDA.map((item) => (
            <span key={item.label} className="flex items-center gap-2">
              <span className={`size-2.5 rounded-full ${item.dot}`} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-7.5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {meses.map((mes) => (
          <MesCard key={mes.competencia} mes={mes} />
        ))}
      </div>

      <div className="mt-8.5 overflow-hidden rounded-2xl border border-line bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft px-6.5 py-5.5">
          <h3 className="text-[17px] font-bold text-ink">
            Plano de ação priorizado
          </h3>
          <span className="text-[13px] text-ink-faint">
            {acoes.length} {acoes.length === 1 ? "item" : "itens"}
            {urgentes > 0 && ` · ${urgentes} com prazo nos próximos 15 dias`}
          </span>
        </div>

        <div
          className={`hidden gap-4 bg-[#f7fafb] px-6.5 py-3.5 text-[11.5px] font-bold tracking-[0.08em] text-[#8497a5] uppercase sm:grid ${COLUNAS}`}
        >
          <div>Ocorrência</div>
          <div>Competência</div>
          <div>Status</div>
          <div>Prazo</div>
        </div>

        {acoes.length === 0 && (
          <div className="border-t border-line-faint px-6.5 py-8 text-center text-[14.5px] text-ink-faint">
            Nenhuma ocorrência pendente nas competências selecionadas.
          </div>
        )}

        {acoes.map((acao) => (
          <div
            key={acao.titulo}
            className={`grid grid-cols-1 items-center gap-2 border-t border-line-faint px-6.5 py-4.5 text-[14.5px] text-ink-soft sm:gap-4 ${COLUNAS_SM}`}
          >
            <div className="font-semibold text-ink">{acao.titulo}</div>
            <div className="font-mono text-[13px] text-[#6d8193]">
              {acao.competencia}
            </div>
            <div>
              <Chip status={acao.status} />
            </div>
            <div className="text-[13.5px] text-[#6d8193]">{acao.prazo}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
