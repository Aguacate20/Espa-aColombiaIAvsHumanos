"use client";

import { useEffect } from "react";
import { allImagesFor, type StimulusSet } from "@/data/stimuli";

/** Descarga por adelantado las imágenes del participante para que el tiempo
 *  de respuesta no incluya la espera de carga en las primeras situaciones. */
export function usePreloadImages(set: StimulusSet) {
  useEffect(() => {
    allImagesFor(set).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [set]);
}
