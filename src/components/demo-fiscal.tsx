"use client";

import { useEffect, useRef, useState } from "react";
import { Diagnostico } from "@/components/diagnostico";
import { Relatorio } from "@/components/relatorio";
import { cnpjCompleto, formatarCnpj } from "@/lib/cnpj";
import { PERIODO_PADRAO } from "@/lib/fiscvision-data";
import { gerarRelatorio, type RelatorioDoc } from "@/lib/relatorio-api";

const AVISO_INICIAL =
  "Informe o CNPJ e o período: o agente consulta o Zen Fiscal e devolve o relatório.";
const AVISO_ANALISANDO =
  "Consultando Zen Fiscal e montando o documento — isso pode levar alguns minutos.";
const AVISO_PRONTO = "Relatório pronto — veja o documento abaixo.";
const AVISO_CNPJ = "Digite os 14 dígitos do CNPJ para continuar.";

type Props = {
  /** período inicial do relatório, em meses */
  mesesVisiveis?: number;
};

export function DemoFiscal({ mesesVisiveis = PERIODO_PADRAO }: Props) {
  const [cnpj, setCnpj] = useState("");
  const [periodo, setPeriodo] = useState(mesesVisiveis);
  const [carregando, setCarregando] = useState(false);
  const [doc, setDoc] = useState<RelatorioDoc | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState(AVISO_INICIAL);
  /** período com que o documento na tela foi gerado */
  const [periodoDoDoc, setPeriodoDoDoc] = useState(mesesVisiveis);

  const abortar = useRef<AbortController | null>(null);
  useEffect(() => () => abortar.current?.abort(), []);

  const gerar = async () => {
    if (carregando) return;

    if (!cnpjCompleto(cnpj)) {
      setErro(null);
      setAviso(AVISO_CNPJ);
      return;
    }

    abortar.current?.abort();
    const controller = new AbortController();
    abortar.current = controller;

    setCarregando(true);
    setErro(null);
    setDoc(null);
    setAviso(AVISO_ANALISANDO);
    setPeriodoDoDoc(periodo);

    try {
      const resultado = await gerarRelatorio(cnpj, periodo, controller.signal);
      setDoc(resultado);
      setAviso(AVISO_PRONTO);
    } catch (e) {
      if (controller.signal.aborted) return;
      const mensagem =
        e instanceof Error
          ? e.message
          : "Não foi possível gerar o relatório. Tente novamente.";
      setErro(mensagem);
      setAviso("");
    } finally {
      if (!controller.signal.aborted) setCarregando(false);
    }
  };

  return (
    <>
      <Diagnostico
        cnpj={cnpj}
        onCnpjChange={(valor) => {
          setCnpj(formatarCnpj(valor));
          if (aviso === AVISO_CNPJ) setAviso(AVISO_INICIAL);
        }}
        periodo={periodo}
        onPeriodoChange={setPeriodo}
        onGerar={gerar}
        carregando={carregando}
        botaoLabel={carregando ? "Analisando…" : "Gerar Diagnóstico"}
        statusMsg={aviso}
      />
      <Relatorio
        doc={doc}
        carregando={carregando}
        erro={erro}
        periodo={periodoDoDoc}
      />
    </>
  );
}
