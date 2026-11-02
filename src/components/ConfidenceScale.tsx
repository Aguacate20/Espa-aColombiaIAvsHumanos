"use client";

import { useEffect, useRef, useState } from "react";

/** Escala 0–10 discreta. Botones, no slider: es una magnitud puntual. */
export function ConfidenceScale({
  title,
  lowLabel,
  highLabel,
  cta,
  onCommit,
  busy = false,
}: {
  title: string;
  lowLabel: string;
  highLabel: string;
  cta: string;
  onCommit: (v: { value: number; rtMs: number }) => void;
  /** true mientras se guarda: bloquea el botón para evitar doble envío */
  busy?: boolean;
}) {
  const [value, setValue] = useState<number | null>(null);
  const t0 = useRef(0);
  // Un doble toque en "Continuar" de la pantalla anterior caía aquí y marcaba
  // un valor sin querer: se ignoran los toques de los primeros 250 ms (nadie apunta y toca un número tan rápido).
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    t0.current = performance.now();
    setValue(null);
    setArmed(false);
    const id = setTimeout(() => setArmed(true), 250);
    return () => clearTimeout(id);
  }, [title]);

  return (
    <div className="fade-in">
      <h2 className="font-display text-[24px] sm:text-[28px] leading-snug text-ink max-w-measure">{title}</h2>

      <div className="mt-10">
        <div className="grid grid-cols-11 gap-1 sm:gap-2" role="radiogroup" aria-label={title}>
          {Array.from({ length: 11 }, (_, i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={value === i}
              onClick={() => armed && setValue(i)}
              className={`aspect-square rounded-sm border text-[14px] tabular-nums transition-colors ${
                value === i
                  ? "border-brand bg-brand text-white"
                  : "border-line text-ink hover:border-brand hover:text-brand"
              }`}
            >
              {i}
            </button>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[12px] text-muted">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          disabled={value === null || busy}
          onClick={() => onCommit({ value: value!, rtMs: Math.round(performance.now() - t0.current) })}
          className="inline-flex items-center justify-center px-8 py-3 text-[15px] font-medium rounded-sm bg-brand text-white transition-colors hover:bg-ink disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
