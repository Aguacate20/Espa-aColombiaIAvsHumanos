"use client";

import { useEffect, useRef, useState } from "react";

export type Agent = "ia" | "humano";

/**
 * SLIDER BILATERAL — el elemento central del experimento.
 *
 * Restricciones de diseño que NO se pueden relajar:
 *  1. Simetría exacta. Ambos extremos comparten tipografía, peso, color y
 *     ancho de caja. Ninguna señal visual puede hacer un lado más saliente.
 *  2. Sin valor por defecto legible. El pulsador arranca en el centro con
 *     borde punteado y el botón se mantiene deshabilitado hasta que el
 *     participante lo mueve, para no imponer un anclaje.
 *  3. El relleno crece desde el centro hacia el lado elegido: informa la
 *     magnitud de la preferencia sin colorear a ninguno de los dos agentes.
 */
export function AgentBeam({
  left,
  right,
  labels,
  onCommit,
  hint,
  untouchedHint,
  cta,
}: {
  left: Agent;
  right: Agent;
  labels: Record<Agent, string>;
  onCommit: (v: { value: number; moves: number; rtMs: number }) => void;
  hint: string;
  untouchedHint: string;
  cta: string;
}) {
  const [value, setValue] = useState(50);
  const [touched, setTouched] = useState(false);
  const moves = useRef(0);
  const t0 = useRef(0);

  useEffect(() => {
    t0.current = performance.now();
    setValue(50);
    setTouched(false);
    moves.current = 0;
  }, [labels, left, right]);

  const offset = value - 50; // -50..50
  const fillLeft = offset < 0 ? 50 + offset : 50;
  const fillWidth = Math.abs(offset);

  return (
    <div className="mt-10">
      <div className="flex items-start justify-between gap-6 mb-5">
        <span className="flex-1 text-left font-display text-[19px] leading-snug text-ink">{labels[left]}</span>
        <span className="flex-1 text-right font-display text-[19px] leading-snug text-ink">{labels[right]}</span>
      </div>

      <div className="relative py-3">
        {/* Riel de fondo + relleno desde el centro */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <div className="relative h-[2px] w-full bg-line">
            <div
              className="absolute top-0 h-[2px] bg-brand transition-[left,width] duration-100"
              style={{ left: `${fillLeft}%`, width: `${fillWidth}%` }}
            />
            <div className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-line" />
          </div>
        </div>

        <input
          type="range"
          className="beam relative"
          min={0}
          max={100}
          step={1}
          value={value}
          data-untouched={!touched}
          aria-label={hint}
          aria-valuetext={
            !touched ? "sin respuesta" : offset === 0 ? "en el centro" : offset < 0 ? labels[left] : labels[right]
          }
          onChange={(e) => {
            setValue(Number(e.target.value));
            if (!touched) setTouched(true);
            moves.current += 1;
          }}
        />
      </div>

      <p className="mt-3 text-center text-[13px] text-muted min-h-[1.5rem]" aria-live="polite">
        {touched ? hint : untouchedHint}
      </p>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          disabled={!touched}
          onClick={() => onCommit({ value, moves: moves.current, rtMs: Math.round(performance.now() - t0.current) })}
          className="inline-flex items-center justify-center px-8 py-3 text-[15px] font-medium rounded-sm bg-brand text-white transition-colors hover:bg-ink disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
