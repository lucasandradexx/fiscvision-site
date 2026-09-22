import { PERIODOS, rotuloPeriodo } from "@/lib/fiscvision-data";

const LABEL =
  "mb-2.5 block text-xs font-bold tracking-[0.1em] text-on-navy-faint uppercase";
const CAMPO =
  "w-full rounded-[11px] border border-white/20 bg-white/6 px-4.5 py-4 text-base text-white outline-none focus:border-cyan focus:bg-cyan/10";

type Props = {
  cnpj: string;
  onCnpjChange: (valor: string) => void;
  periodo: number;
  onPeriodoChange: (meses: number) => void;
  onGerar: () => void;
  botaoLabel: string;
  statusMsg: string;
  carregando: boolean;
};

export function Diagnostico({
  cnpj,
  onCnpjChange,
  periodo,
  onPeriodoChange,
  onGerar,
  botaoLabel,
  statusMsg,
  carregando,
}: Props) {
  return (
    <section id="diagnostico" className="mx-auto max-w-[1140px] px-6 pt-[70px]">
      <div className="rounded-[20px] bg-ink px-6 py-10 text-white sm:px-11 sm:py-12">
        <div className="grid grid-cols-1 items-center gap-11 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div>
            <h2 className="text-[30px] leading-[1.18] font-extrabold tracking-[-0.02em] text-pretty">
              Digite o CNPJ do cliente e receba o diagnóstico.
            </h2>
            <p className="mt-3.5 text-base leading-relaxed text-on-navy">
              A análise cobre{" "}
              {periodo === 1 ? "o último mês" : `os últimos ${periodo} meses`}{" "}
              de competência e leva, em média, 40 segundos.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-end gap-3">
              <div className="min-w-0 flex-[1_1_220px]">
                <label htmlFor="cnpj" className={LABEL}>
                  CNPJ do cliente
                </label>
                <input
                  id="cnpj"
                  type="text"
                  inputMode="numeric"
                  placeholder="00.000.000/0000-00"
                  value={cnpj}
                  onChange={(e) => onCnpjChange(e.target.value)}
                  className={`${CAMPO} font-mono tracking-[0.03em]`}
                />
              </div>

              <div className="min-w-0 flex-[0_1_170px]">
                <label htmlFor="periodo" className={LABEL}>
                  Período do relatório
                </label>
                <div className="relative">
                  <select
                    id="periodo"
                    value={periodo}
                    onChange={(e) => onPeriodoChange(Number(e.target.value))}
                    className={`${CAMPO} cursor-pointer appearance-none pr-10`}
                  >
                    {PERIODOS.map((meses) => (
                      <option
                        key={meses}
                        value={meses}
                        className="bg-ink text-white"
                      >
                        {rotuloPeriodo(meses)}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-on-navy-faint"
                  >
                    <path
                      d="m5 7.5 5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <button
                type="button"
                onClick={onGerar}
                disabled={carregando}
                className="cursor-pointer rounded-[11px] bg-cyan px-6.5 py-4 text-[15px] font-bold text-deep transition-colors hover:bg-cyan-light disabled:cursor-wait disabled:opacity-80"
              >
                {botaoLabel}
              </button>
            </div>

            <div
              aria-live="polite"
              className="mt-3 min-h-5 text-[13px] text-[#8fb0c8]"
            >
              {statusMsg}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
