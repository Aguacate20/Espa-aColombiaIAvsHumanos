import { NextResponse } from "next/server";
import { getParticipant, setStep } from "@/lib/session";
import { GENERIC_SCALES, nextGenericScale, prevGenericScale, scaleSlug } from "@/data/scales/registry";

export const dynamic = "force-dynamic";

/**
 * Resuelve la navegación entre cuestionarios. El orden vive aquí, en el
 * servidor, no en el cliente: así cambiar el orden del protocolo es tocar
 * un solo arreglo (GENERIC_SCALES) sin desincronizar botones.
 *
 * La primera escala genérica es HGAITS; su "atrás" vuelve a CEIA-9.
 * La última es ERQ; su "siguiente" pasa a la familiarización.
 */
export async function GET(req: Request) {
  const p = await getParticipant();
  if (!p) return NextResponse.json({ path: "/" });

  const url = new URL(req.url);
  const id = url.searchParams.get("scale") ?? "";
  const dir = url.searchParams.get("dir") ?? "next";
  const first = GENERIC_SCALES[0];

  if (dir === "back") {
    const prev = prevGenericScale(id);
    if (prev) return NextResponse.json({ path: `/escalas/${scaleSlug(prev)}` });
    return NextResponse.json({ path: "/escalas/ceia9" });
  }

  const next = nextGenericScale(id);
  if (next) {
    await setStep(p.id, `scale_${scaleSlug(next)}`);
    return NextResponse.json({ path: `/escalas/${scaleSlug(next)}` });
  }
  // Última escala → familiarización
  await setStep(p.id, "familiarization");
  return NextResponse.json({ path: "/experimento/familiarizacion" });
}
