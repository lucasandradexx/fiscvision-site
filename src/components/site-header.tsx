import Image from "next/image";

const LINKS = [
  { href: "#sobre", label: "O que é" },
  { href: "#diagnostico", label: "Diagnóstico" },
  { href: "#relatorio", label: "Relatório" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-6 px-6 py-3.5">
        <Image
          src="/logo-fiscvision.svg"
          alt="FiscVision"
          width={220}
          height={120}
          priority
          className="h-10 w-auto sm:h-16"
        />
        <nav className="flex items-center gap-4 text-sm font-semibold text-ink-nav sm:gap-7">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-navy">
              {link.label}
            </a>
          ))}
          <span className="hidden border-l border-line pl-7 text-xs font-bold tracking-[0.08em] text-ink-ghost uppercase lg:inline">
            MN Software
          </span>
        </nav>
      </div>
    </header>
  );
}
