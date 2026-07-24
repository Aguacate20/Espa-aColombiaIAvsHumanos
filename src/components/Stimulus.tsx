"use client";

import { useState } from "react";
import { iaImage, humanImage, type StimulusSet } from "@/data/stimuli";

/**
 * Imagen de estímulo con marco. `intensity` (0..1) controla un halo que
 * crece con la preferencia: se usa en el slider para que el participante
 * "sienta" visualmente que llevar la barra al extremo = más confianza.
 */
export function StimulusFrame({
  src,
  alt,
  intensity = 0,
  side,
}: {
  src: string;
  alt: string;
  intensity?: number;
  side?: "left" | "right";
}) {
  const glow = Math.max(0, Math.min(1, intensity));
  return (
    <div
      className="relative rounded-lg overflow-hidden border transition-[box-shadow,border-color,transform] duration-150"
      style={{
        borderColor: `rgb(var(--brand) / ${0.25 + glow * 0.75})`,
        boxShadow: glow > 0.02 ? `0 0 0 ${1 + glow * 3}px rgb(var(--brand) / ${glow * 0.55}), 0 8px 30px rgb(var(--brand) / ${glow * 0.35})` : "0 1px 3px rgb(0 0 0 / 0.12)",
        transform: `scale(${1 + glow * 0.03})`,
      }}
      aria-hidden={side ? undefined : true}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block w-full h-auto select-none" draggable={false} />
    </div>
  );
}

/**
 * Interlocutor humano. Muestra una imagen y alterna a la otra variante
 * (hombre/mujer) al pasar el cursor o tocar, para comunicar "una persona,
 * cualquiera que sea". No influye en la respuesta: es solo presentación.
 */
export function HumanStimulus({ set }: { set: StimulusSet }) {
  const [showSecond, setShowSecond] = useState(false);
  const first = humanImage(set, "hombre");
  const second = humanImage(set, "mujer");
  const src = showSecond ? second : first;

  return (
    <button
      type="button"
      className="block w-full cursor-pointer"
      onMouseEnter={() => setShowSecond(true)}
      onMouseLeave={() => setShowSecond(false)}
      onClick={() => setShowSecond((s) => !s)}
      aria-label="Interlocutor humano: alternar variante"
    >
      <StimulusFrame src={src} alt="Una persona" />
    </button>
  );
}

export function IaStimulus({ set }: { set: StimulusSet }) {
  return <StimulusFrame src={iaImage(set)} alt="Chat con inteligencia artificial" />;
}
