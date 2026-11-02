/**
 * Captura en el navegador las características del dispositivo que pueden
 * afectar al tiempo de respuesta (RT) y al modelo de difusión: tipo de
 * puntero, tamaño de pantalla y del área visible, densidad de píxeles.
 * Nada de esto identifica a la persona. Se ejecuta SOLO en el cliente.
 */
export interface DeviceInfo {
  pointerCoarse: boolean | null;     // matchMedia('(pointer: coarse)') → puntero principal táctil
  anyPointerCoarse: boolean | null;  // hay ALGÚN puntero táctil (p. ej. portátil con pantalla táctil)
  anyPointerFine: boolean | null;    // hay ALGÚN puntero fino (ratón / panel táctil)
  hoverNone: boolean | null;         // matchMedia('(hover: none)')
  maxTouchPoints: number | null;
  screenW: number | null;
  screenH: number | null;
  viewportW: number | null;
  viewportH: number | null;
  devicePixelRatio: number | null;
  orientation: string | null;        // 'portrait' | 'landscape'
  uaMobile: boolean | null;          // navigator.userAgentData.mobile (Chrome/Edge); null en Safari/Firefox
  platform: string | null;
  deviceDetected: "pc" | "movil" | "tableta";
}

function mq(q: string): boolean | null {
  try {
    return window.matchMedia(q).matches;
  } catch {
    return null;
  }
}

export function collectDeviceInfo(): DeviceInfo {
  const nav = navigator as Navigator & { userAgentData?: { mobile?: boolean; platform?: string } };
  const pointerCoarse = mq("(pointer: coarse)");
  const screenW = window.screen?.width ?? null;
  const screenH = window.screen?.height ?? null;
  const shortSide = screenW && screenH ? Math.min(screenW, screenH) : null;
  const ua = nav.userAgent || "";
  const isIpadOs = /Macintosh/.test(ua) && (nav.maxTouchPoints ?? 0) > 1;

  // Clasificación automática (se contrasta con lo que declara el participante).
  let deviceDetected: DeviceInfo["deviceDetected"] = "pc";
  if (pointerCoarse || isIpadOs) {
    deviceDetected = /iPad|Tablet/i.test(ua) || isIpadOs || (shortSide !== null && shortSide >= 600) ? "tableta" : "movil";
  }

  return {
    pointerCoarse,
    anyPointerCoarse: mq("(any-pointer: coarse)"),
    anyPointerFine: mq("(any-pointer: fine)"),
    hoverNone: mq("(hover: none)"),
    maxTouchPoints: typeof nav.maxTouchPoints === "number" ? nav.maxTouchPoints : null,
    screenW,
    screenH,
    viewportW: window.innerWidth ?? null,
    viewportH: window.innerHeight ?? null,
    devicePixelRatio: window.devicePixelRatio ?? null,
    orientation: mq("(orientation: portrait)") === null ? null : mq("(orientation: portrait)") ? "portrait" : "landscape",
    uaMobile: typeof nav.userAgentData?.mobile === "boolean" ? nav.userAgentData.mobile : null,
    platform: nav.userAgentData?.platform ?? nav.platform ?? null,
    deviceDetected,
  };
}
