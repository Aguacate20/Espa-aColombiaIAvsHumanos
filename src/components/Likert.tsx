"use client";

/** Rejilla Likert de 5 puntos. Los códigos de ítem/subescala nunca se muestran. */
export function LikertItem({
  text,
  anchors,
  value,
  onChange,
  name,
  index,
}: {
  text: string;
  anchors: string[];
  value?: number;
  onChange: (v: number) => void;
  name: string;
  index: number;
}) {
  return (
    <fieldset className="border-t border-line py-6">
      <legend className="sr-only">{text}</legend>
      <p className="text-[16px] leading-snug text-ink mb-4">
        <span className="text-muted tabular-nums mr-3 text-[13px]">{index}</span>
        {text}
      </p>
      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {anchors.map((anchor, i) => {
          const v = i + 1;
          const active = value === v;
          return (
            <label
              key={v}
              className={`cursor-pointer rounded-sm border px-1 py-2 text-center transition-colors ${
                active ? "border-brand bg-brand text-white" : "border-line text-ink hover:border-brand"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={v}
                checked={active}
                onChange={() => onChange(v)}
                className="sr-only"
              />
              <span className="block text-[15px] tabular-nums font-medium">{v}</span>
              <span className={`mt-1 block text-[11px] leading-tight ${active ? "text-white/85" : "text-muted"}`}>
                {anchor}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
