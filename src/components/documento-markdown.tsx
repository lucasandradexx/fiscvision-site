import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/** O agente devolve markdown; aqui ele vira documento com a tipografia da marca. */
const COMPONENTES: Components = {
  h1: ({ children }) => (
    <h1 className="mt-10 mb-4 border-b border-line pb-3 text-[26px] leading-tight font-extrabold tracking-[-0.02em] text-ink first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-9 mb-3 text-[19px] font-bold tracking-[-0.01em] text-navy first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 text-[16px] font-bold text-ink first:mt-0">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-3 text-[15px] leading-[1.7] text-ink-muted">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-3 flex list-none flex-col gap-2 pl-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 flex list-decimal flex-col gap-2 pl-5 marker:font-bold marker:text-teal">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-[15px] leading-[1.65] text-ink-muted">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-ink">{children}</strong>
  ),
  em: ({ children }) => <em className="text-ink-subtle italic">{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="font-semibold text-teal underline underline-offset-2 hover:text-navy"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-0 border-t border-line" />,
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-3 border-cyan bg-canvas py-2 pl-4 text-[15px] text-ink-subtle">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded-md bg-canvas px-1.5 py-0.5 font-mono text-[13px] text-navy">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-xl border border-line bg-canvas p-4 font-mono text-[13px] leading-relaxed text-ink">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-5 overflow-x-auto rounded-xl border border-line">
      <table className="w-full border-collapse text-left text-[14px]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#f7fafb]">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-line px-4 py-3 text-[11.5px] font-bold tracking-[0.08em] text-[#8497a5] uppercase">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-t border-line-faint px-4 py-3 align-top text-ink-soft">
      {children}
    </td>
  ),
};

export function DocumentoMarkdown({ conteudo }: { conteudo: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTES}>
      {conteudo}
    </ReactMarkdown>
  );
}
