export type StatusKey = "regular" | "atencao" | "critico" | "na";

type StatusStyle = {
  label: string;
  /** chip completo: fundo + cor do texto */
  chip: string;
  /** bolinha do chip, herda a cor do texto */
  dot: string;
};

/** Semáforo fiscal — classes literais para o scanner do Tailwind enxergar. */
export const SEMAFORO: Record<StatusKey, StatusStyle> = {
  regular: {
    label: "Regular",
    chip: "bg-regular-soft text-regular",
    dot: "bg-regular",
  },
  atencao: {
    label: "Atenção",
    chip: "bg-atencao-soft text-atencao",
    dot: "bg-atencao",
  },
  critico: {
    label: "Crítico",
    chip: "bg-critico-soft text-critico",
    dot: "bg-critico",
  },
  na: { label: "Não analisado", chip: "bg-na-soft text-na", dot: "bg-na" },
};

export const LEGENDA: { label: string; dot: string }[] = [
  { label: "Regular", dot: "bg-regular-dot" },
  { label: "Atenção", dot: "bg-atencao-dot" },
  { label: "Crítico", dot: "bg-critico-dot" },
  { label: "Não analisado", dot: "bg-na-dot" },
];

export type Mes = {
  mes: string;
  competencia: string;
  status: StatusKey;
  regular: number;
  atencao: number;
  critico: number;
  naoAnalisado: number;
  nota: string;
};

export const MESES: Mes[] = [
  {
    mes: "Setembro",
    competencia: "09/2026",
    status: "atencao",
    regular: 6,
    atencao: 3,
    critico: 0,
    naoAnalisado: 2,
    nota: "EFD Contribuições ainda não transmitida; 2 notas sem escrituração.",
  },
  {
    mes: "Agosto",
    competencia: "08/2026",
    status: "regular",
    regular: 9,
    atencao: 1,
    critico: 0,
    naoAnalisado: 1,
    nota: "Apuração conciliada. Divergência de R$ 412 em crédito de PIS.",
  },
  {
    mes: "Julho",
    competencia: "07/2026",
    status: "critico",
    regular: 5,
    atencao: 2,
    critico: 3,
    naoAnalisado: 1,
    nota: "DAS em atraso e ICMS-ST recolhido a menor. Priorizar regularização.",
  },
  {
    mes: "Junho",
    competencia: "06/2026",
    status: "regular",
    regular: 10,
    atencao: 1,
    critico: 0,
    naoAnalisado: 0,
    nota: "Obrigações acessórias entregues no prazo. Nenhum alerta relevante.",
  },
  {
    mes: "Maio",
    competencia: "05/2026",
    status: "atencao",
    regular: 7,
    atencao: 3,
    critico: 1,
    naoAnalisado: 1,
    nota: "Notas canceladas fora do prazo e CFOP divergente em 4 documentos.",
  },
  {
    mes: "Abril",
    competencia: "04/2026",
    status: "na",
    regular: 1,
    atencao: 1,
    critico: 0,
    naoAnalisado: 1,
    nota: "Base do Zen Fiscal incompleta para o período. Reprocessamento sugerido.",
  },
];

export type Acao = {
  titulo: string;
  competencia: string;
  status: StatusKey;
  prazo: string;
  /** prazo em dias para contagem de urgência; null = sem prazo definido */
  prazoDias: number | null;
};

export const ACOES: Acao[] = [
  {
    titulo: "DAS de julho em atraso — multa e juros acumulando",
    competencia: "07/2026",
    status: "critico",
    prazo: "Imediato",
    prazoDias: 0,
  },
  {
    titulo: "ICMS-ST recolhido a menor em 3 operações",
    competencia: "07/2026",
    status: "critico",
    prazo: "5 dias",
    prazoDias: 5,
  },
  {
    titulo: "EFD Contribuições pendente de transmissão",
    competencia: "09/2026",
    status: "atencao",
    prazo: "15 dias",
    prazoDias: 15,
  },
  {
    titulo: "CFOP divergente em 4 notas de entrada",
    competencia: "05/2026",
    status: "atencao",
    prazo: "30 dias",
    prazoDias: 30,
  },
  {
    titulo: "Reprocessar base do Zen Fiscal do período",
    competencia: "04/2026",
    status: "na",
    prazo: "A definir",
    prazoDias: null,
  },
];

export const ETAPAS = [
  {
    numero: "01",
    cor: "bg-navy",
    titulo: "Consulta o Zen Fiscal",
    texto:
      "Busca automaticamente notas, guias, escriturações e obrigações do CNPJ informado.",
  },
  {
    numero: "02",
    cor: "bg-cyan",
    titulo: "Organiza as informações",
    texto:
      "Normaliza períodos, agrupa por competência e identifica o que está faltando na base.",
  },
  {
    numero: "03",
    cor: "bg-teal",
    titulo: "Analisa documentos e obrigações",
    texto:
      "Cruza divergências entre apurado, declarado e recolhido, e sinaliza prazos vencidos.",
  },
  {
    numero: "04",
    cor: "bg-regular-dot",
    titulo: "Entrega diagnóstico e plano",
    texto:
      "Relatório por mês com semáforo, alertas priorizados e próximos passos sugeridos.",
  },
];

/** Períodos selecionáveis no formulário, limitados aos meses disponíveis na base. */
export const PERIODOS = Array.from({ length: MESES.length }, (_, i) => i + 1);

export const PERIODO_PADRAO = MESES.length;

/** "1 mês" / "6 meses" */
export function rotuloPeriodo(meses: number): string {
  return `${meses} ${meses === 1 ? "mês" : "meses"}`;
}

export const CNPJ_EXEMPLO = "12.345.678/0001-90";
export const CLIENTE_EXEMPLO = "Comercial Aurora Distribuidora Ltda.";
