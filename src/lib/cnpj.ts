/** Aplica a máscara 00.000.000/0000-00 conforme o usuário digita. */
export function formatarCnpj(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 14);
  if (d.length > 12) {
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
  }
  if (d.length > 8)
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  if (d.length > 5) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length > 2) return `${d.slice(0, 2)}.${d.slice(2)}`;
  return d;
}

/** CNPJ com máscara completa tem 18 caracteres. */
export const CNPJ_COMPLETO = 18;

/** Remove a máscara — é assim que o webhook espera o CNPJ. */
export function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

export function cnpjCompleto(valor: string): boolean {
  return apenasDigitos(valor).length === 14;
}
