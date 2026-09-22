const FUSO = "America/Sao_Paulo";

/**
 * Data da consulta no formato dd/MM/yyyy.
 * O webhook chama esse campo de "competencia": é o dia do envio, gerado pelo
 * sistema — não vem do formulário.
 */
export function competenciaHoje(agora: Date = new Date()): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: FUSO,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(agora);
}
