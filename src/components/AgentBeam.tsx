"use client";

import { useEffect, useRef, useState } from "react";
import { iaImage, humanImage, type StimulusSet } from "@/data/stimuli";

export type Agent = "ia" | "humano";

/**
 * SLIDER BILATERAL con estímulos y halo dinámico.
 *
 * El halo de cada lado crece con la preferencia hacia ese lado: mueve la
 * barra a la izquierda y el estímulo izquierdo se ilumina y crece; al centro,
 * ninguno resalta. Comunica la magnitud sin colorear a ningún agente y sin
 * romper la simetría (ambos usan exactamente el mismo tratamiento).
 *
 * Restricciones intactas: sin valor por defecto legible (pulsador punteado,
 * botón deshabilitado hasta el primer movimiento) y extremos simétricos.
 */
export function AgentBeam({
  left,
  right,
  labels,
  stimulusSet,
  humanGender,
  onCommit,
  hint,
  untouchedHint,
  cta,
}: {
  left: Agent;
  right: Agent;
  labels: Record<Agent, string>;
  stimulusSet: StimulusSet;
  humanGender: "hombre" | "mujer";
  onCommit: (v: { value: number; moves: number; rtMs: number; firstMoveMs: number | null; pointerType: string | null; awayMs: number }) => void;
  hint: string;
  untouchedHint: string;
  cta: string;
}) {
  const [value, setValue] = useState(50);
  const [touched, setTouched] = useState(false);
  const moves = useRef(0);
  const t0 = useRef(0);
  // Para el DDM: tiempo hasta el PRIMER movimiento y modalidad de entrada
  // (PointerEvent.pointerType: "mouse" | "touch" | "pen"; "keyboard" si se usa el teclado).
  const firstMove = useRef<number | null>(null);
  const pointerType = useRef<string | null>(null);
  // Tiempo FUERA de la tarea durante la elección (cambió de app o de pestaña,
  // o la ventana perdió el foco). Un RT con away_ms > 0 no es un RT limpio.
  const awayMs = useRef(0);
  const awaySince = useRef<number | null>(null);

  useEffect(() => {
    const leave = () => {
      if (awaySince.current === null) awaySince.current = performance.now();
    };
    const back = () => {
      if (awaySince.current !== null && !document.hidden) {
        awayMs.current += performance.now() - awaySince.current;
        awaySince.current = null;
      }
    };
    const onVisibility = () => (document.hidden ? leave() : back());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", leave);
    window.addEventListener("focus", back);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", leave);
      window.removeEventListener("focus", back);
    };
  }, []);

  useEffect(() => {
    t0.current = performance.now();
    setValue(50);
    setTouched(false);
    moves.current = 0;
    firstMove.current = null;
    pointerType.current = null;
    awayMs.current = 0;
    awaySince.current = null;
  }, [left, right, humanGender]);

  const offset = value - 50; // -50..50
  const fillLeft = offset < 0 ? 50 + offset : 50;
  const fillWidth = Math.abs(offset);

  // Intensidad del halo por lado: 0 en el centro, 1 en el extremo.
  const leftGlow = touched ? Math.max(0, -offset) / 50 : 0;
  const rightGlow = touched ? Math.max(0, offset) / 50 : 0;

  const imgFor = (a: Agent) => (a === "ia" ? iaImage(stimulusSet) : humanImage(stimulusSet, humanGender));

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-6 sm:gap-12 items-end mb-6">
        {(["left", "right"] as const).map((sideKey) => {
          const agent = sideKey === "left" ? left : right;
          const glow = sideKey === "left" ? leftGlow : rightGlow;
          return (
            <div key={sideKey} className="flex flex-col items-center">
              <div className="w-32 sm:w-40">
                <StimulusGlow src={imgFor(agent)} alt={labels[agent]} intensity={glow} />
              </div>
              <span className="mt-3 text-center font-display text-[17px] sm:text-[19px] leading-snug text-ink">
                {labels[agent]}
              </span>
            </div>
          );
        })}
      </div>

      <div className="relative py-3">
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <div className="relative h-[2px] w-full bg-line">
            <div className="absolute top-0 h-[2px] bg-brand transition-[left,width] duration-100" style={{ left: `${fillLeft}%`, width: `${fillWidth}%` }} />
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
          aria-valuetext={!touched ? "sin respuesta" : offset === 0 ? "en el centro" : offset < 0 ? labels[left] : labels[right]}
          onPointerDown={(e) => {
            if (!pointerType.current) pointerType.current = e.pointerType || null;
            if (firstMove.current === null) firstMove.current = Math.round(performance.now() - t0.current);
          }}
          onKeyDown={() => {
            if (!pointerType.current) pointerType.current = "keyboard";
          }}
          onChange={(e) => {
            if (firstMove.current === null) firstMove.current = Math.round(performance.now() - t0.current);
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
          onClick={() =>
            onCommit({
              value,
              moves: moves.current,
              rtMs: Math.round(performance.now() - t0.current),
              firstMoveMs: firstMove.current,
              pointerType: pointerType.current,
              awayMs: Math.round(awayMs.current + (awaySince.current !== null ? performance.now() - awaySince.current : 0)),
            })
          }
          className="inline-flex items-center justify-center px-8 py-3 text-[15px] font-medium rounded-sm bg-brand text-white transition-colors hover:bg-ink disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {cta}
        </button>
      </div>
    </div>
  );
}

/** Igual que StimulusFrame pero local, para no acoplar el slider a otro archivo. */
function StimulusGlow({ src, alt, intensity }: { src: string; alt: string; intensity: number }) {
  const glow = Math.max(0, Math.min(1, intensity));
  return (
    <div
      className="relative rounded-lg overflow-hidden border transition-[box-shadow,border-color,transform] duration-100"
      style={{
        borderColor: `rgb(var(--brand) / ${0.25 + glow * 0.75})`,
        boxShadow: glow > 0.02 ? `0 0 0 ${1 + glow * 3}px rgb(var(--brand) / ${glow * 0.55}), 0 8px 30px rgb(var(--brand) / ${glow * 0.35})` : "0 1px 3px rgb(0 0 0 / 0.12)",
        transform: `scale(${1 + glow * 0.04})`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block w-full h-auto select-none" draggable={false} />
    </div>
  );
}
