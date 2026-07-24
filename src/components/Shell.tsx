import Link from "next/link";

export function Shell({
  children,
  progress,
  step,
}: {
  children: React.ReactNode;
  /** 0..1 — omitir para no mostrar barra */
  progress?: number;
  step?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-line">
        <div className="mx-auto w-full max-w-3xl px-5 py-3 flex items-baseline justify-between gap-4">
          <Link href="/" className="text-[13px] tracking-[0.14em] uppercase text-brand font-semibold no-underline">
            ¿A quién acudirías?
          </Link>
          {step && <span className="text-[12px] text-muted tabular-nums">{step}</span>}
        </div>
        {progress !== undefined && (
          <div className="h-[3px] w-full bg-brandSoft" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="h-full bg-brand transition-[width] duration-300"
              style={{ width: `${Math.max(2, Math.min(100, progress * 100))}%` }}
            />
          </div>
        )}
      </header>

      <main className="flex-1 mx-auto w-full max-w-3xl px-5 py-10 sm:py-14">{children}</main>

      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-3xl px-5 py-4 text-[12px] leading-relaxed text-muted">
          Universidad de La Sabana · Universitat de València — Investigación académica. Sin fines comerciales.
        </div>
      </footer>
    </div>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return <h1 className="font-display text-[28px] sm:text-[34px] leading-tight text-ink mb-4">{children}</h1>;
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="max-w-measure text-[16px] text-muted mb-8">{children}</p>;
}

export function Button({
  children,
  disabled,
  onClick,
  variant = "primary",
  type = "button",
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 text-[15px] font-medium rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
  const styles =
    variant === "primary"
      ? "bg-brand text-white hover:bg-ink"
      : "border border-line text-ink hover:border-brand hover:text-brand";
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
