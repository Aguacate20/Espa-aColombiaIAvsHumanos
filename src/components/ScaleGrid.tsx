"use client";

import type { Anchor } from "@/data/scales/types";

/**
 * Rejilla Likert genérica. Se adapta al número de anclas (3 a 7) y admite el
 * valor 0 (SIAS). En móvil, con 6-7 puntos, los botones se envuelven en lugar
 * de comprimirse a un ancho ilegible. Nunca muestra códigos de ítem/subescala.
 */
export function ScaleGridItem({
  text,
  anchors,
  value,
  onChange,
  name,
  index,
}: {
  text: string;
  anchors: Anchor[];
  value?: number;
  onChange: (v: number) => void;
  name: string;
  index: number;
}) {
  const n = anchors.length;
  const wide = n >= 6;

  return (
    <fieldset className="border-t border-line py-5 sm:py-6">
      <legend className="sr-only">{text}</legend>
      <p className="text-[15px] sm:text-[16px] leading-snug text-ink mb-3 sm:mb-4">
        <span className="text-muted tabular-nums mr-2 sm:mr-3 text-[13px]">{index}</span>
        {text}
      </p>
      <div
        className={wide ? "grid grid-cols-3 sm:grid-cols-6 md:grid-cols-7 gap-1.5 sm:gap-2" : "grid gap-1.5 sm:gap-2"}
        style={wide ? undefined : { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        role="radiogroup"
        aria-label={text}
      >
        {anchors.map((a) => {
          const active = value === a.value;
          return (
            <label
              key={a.value}
              className={`cursor-pointer rounded-md border px-1 py-2.5 text-center transition-colors min-h-[3.25rem] flex flex-col items-center justify-center ${
                active ? "border-brand bg-brand text-white" : "border-line text-ink hover:border-brand active:border-brand"
              }`}
            >
              <input type="radio" name={name} value={a.value} checked={active} onChange={() => onChange(a.value)} className="sr-only" />
              <span className="block text-[15px] tabular-nums font-medium">{a.value}</span>
              <span className={`mt-0.5 block text-[10px] sm:text-[11px] leading-tight ${active ? "text-white/85" : "text-muted"}`}>{a.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
