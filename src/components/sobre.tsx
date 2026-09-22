import { ETAPAS } from "@/lib/fiscvision-data";

export function Sobre() {
  return (
    <section id="sobre" className="mx-auto max-w-[1140px] px-6 pt-[86px] pb-3">
      <div className="max-w-[44em]">
        <div className="text-xs font-bold tracking-[0.12em] text-teal uppercase">
          O que é o FiscVision
        </div>
        <h2 className="mt-3.5 text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-ink text-pretty sm:text-4xl">
          Um agente de IA que faz a leitura fiscal antes de você abrir o primeiro arquivo.
        </h2>
        <p className="mt-4 text-[17px] leading-[1.65] text-ink-muted text-pretty">
          Ele não substitui o contador. Ele elimina a parte lenta: coletar, conferir, cruzar e
          resumir. A decisão continua sendo sua — só que agora com o cenário inteiro na mesa.
        </p>
      </div>

      <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4.5">
        {ETAPAS.map((etapa) => (
          <div key={etapa.numero} className="rounded-2xl border border-line bg-white p-6.5">
            <div className={`size-8.5 rounded-[9px] ${etapa.cor}`} />
            <div className="mt-4.5 font-mono text-xs text-ink-ghost">{etapa.numero}</div>
            <h3 className="mt-1.5 mb-2 text-[17px] font-bold text-ink">{etapa.titulo}</h3>
            <p className="text-[14.5px] leading-relaxed text-ink-subtle">{etapa.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
