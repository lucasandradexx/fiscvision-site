const RESUMO = [
  { valor: "38", label: "Itens regulares", box: "bg-regular-dot/15 border-regular-dot/35", valorCor: "text-[#7fd982]", labelCor: "text-[#c3dccd]" },
  { valor: "11", label: "Pontos de atenção", box: "bg-atencao-dot/15 border-atencao-dot/30", valorCor: "text-[#f2c94c]", labelCor: "text-[#e2d6b5]" },
  { valor: "4", label: "Críticos", box: "bg-critico-dot/15 border-critico-dot/30", valorCor: "text-[#ff8f84]", labelCor: "text-[#e8cbc8]" },
  { valor: "6", label: "Não analisados", box: "bg-white/6 border-white/15", valorCor: "text-[#cbd9e4]", labelCor: "text-[#a9bccb]" },
];

export function Hero() {
  return (
    <section className="bg-linear-160 from-navy from-0% via-navy-800 via-55% to-navy-900 to-100% text-white">
      <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-14 px-6 pt-20 pb-22 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/35 bg-cyan/15 px-3.5 py-1.5 text-xs font-bold tracking-[0.1em] text-[#5fd8ec] uppercase">
            Agente de inteligência fiscal
          </div>
          <h1 className="mt-5.5 text-4xl leading-[1.06] font-extrabold tracking-[-0.025em] text-pretty sm:text-5xl lg:text-[52px]">
            Dados fiscais viram diagnóstico, alerta e plano de ação.
          </h1>
          <p className="mt-5.5 max-w-[34em] text-lg leading-relaxed text-on-navy-soft text-pretty">
            O FiscVision consulta o Zen Fiscal, organiza documentos e obrigações e entrega ao
            contador uma leitura clara do que está regular, do que exige atenção e do que é crítico
            — mês a mês.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a
              href="#diagnostico"
              className="inline-flex items-center gap-2.5 rounded-[10px] bg-cyan px-6.5 py-4 text-[15px] font-bold text-deep transition-colors hover:bg-cyan-light"
            >
              Gerar diagnóstico
            </a>
            <a
              href="#relatorio"
              className="inline-flex items-center gap-2.5 rounded-[10px] border border-white/20 px-6.5 py-4 text-[15px] font-semibold text-[#e6f1f8] transition-colors hover:bg-white/10"
            >
              Ver relatório de exemplo
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-[11px] font-bold tracking-[0.12em] text-on-navy-faint uppercase">
            Resumo dos últimos 6 meses
          </div>
          <div className="mt-4.5 grid grid-cols-2 gap-3">
            {RESUMO.map((item) => (
              <div key={item.label} className={`rounded-xl border p-4 ${item.box}`}>
                <div className={`text-3xl font-extrabold ${item.valorCor}`}>{item.valor}</div>
                <div className={`mt-0.5 text-[13px] ${item.labelCor}`}>{item.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4.5 font-mono text-xs text-on-navy-faint">
            fonte: Zen Fiscal · atualizado há 2h
          </div>
        </div>
      </div>
    </section>
  );
}
