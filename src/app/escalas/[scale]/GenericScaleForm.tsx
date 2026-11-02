"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Shell, Title, Button } from "@/components/Shell";
import { ScaleGridItem } from "@/components/ScaleGrid";
import type { Anchor } from "@/data/scales/types";
import { postJson, SAVE_ERROR } from "@/lib/postJson";

interface ScaleView {
  id: string;
  title: string;
  instructions: string;
  scaleNote: string | null;
  anchors: Anchor[];
  items: { code: string; text: string }[];
}

/**
 * Formulario genérico para cualquier escala. Una escala = una sección (una
 * pantalla desplazable). Guarda al continuar, reanuda al volver, y consulta
 * al servidor cuál es la ruta siguiente/anterior (el orden vive en el servidor).
 */
export function GenericScaleForm({ scale }: { scale: ScaleView }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t0 = useRef(performance.now());

  useEffect(() => {
    t0.current = performance.now();
    fetch(`/api/scale?scale=${scale.id}`).then((r) => r.json()).then((j) => { if (j.ok) setAnswers((prev) => ({ ...(j.answers ?? {}), ...prev })); }).catch(() => {});
  }, [scale.id]);

  const answered = Object.keys(answers).length;
  const missing = scale.items.filter((it) => answers[it.code] === undefined);
  const complete = missing.length === 0;

  function goToMissing() {
    document.getElementById(`item-${missing[0].code}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function go(direction: "next" | "back") {
    if (busy) return;
    setBusy(true);
    setError(null);
    // Guarda siempre lo respondido (aunque vaya hacia atrás no se pierde).
    // Si no se guarda, NO avanza: así nunca queda un cuestionario vacío en la base.
    const saved = await postJson("/api/scale", { scale: scale.id, answers, pageRtMs: Math.round(performance.now() - t0.current), direction });
    const nav = saved ? await fetch(`/api/scale/nav?scale=${scale.id}&dir=${direction}`).then((r) => r.json()).catch(() => null) : null;
    if (!saved || !nav?.path) {
      setBusy(false);
      setError(SAVE_ERROR);
      return;
    }
    router.push(nav.path);
  }

  return (
    <Shell step={`Cuestionario · ${answered}/${scale.items.length}`}>
      <div className="fade-in">
        <Title>{scale.title}</Title>
        <p className="max-w-measure text-[15px] sm:text-[16px] text-muted mb-2">{scale.instructions}</p>
        {scale.scaleNote && <p className="max-w-measure text-[13px] sm:text-[14px] text-muted mb-6">{scale.scaleNote}</p>}

        <div className="mt-4">
          {scale.items.map((it, i) => (
            <div key={it.code} id={`item-${it.code}`}>
              <ScaleGridItem
                name={it.code}
                index={i + 1}
                text={it.text}
                anchors={scale.anchors}
                value={answers[it.code]}
                onChange={(v) => setAnswers((a) => ({ ...a, [it.code]: v }))}
              />
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-surface border-t border-line pt-4 pb-4 mt-4 flex items-center gap-3 flex-wrap">
          <button
            type="button"
            disabled={busy}
            onClick={() => go("back")}
            className="inline-flex items-center px-6 py-3 text-[15px] font-medium rounded-sm border border-line text-ink hover:border-brand hover:text-brand transition-colors disabled:opacity-40"
          >
            Atrás
          </button>
          <Button onClick={() => go("next")} disabled={!complete || busy}>
            {busy ? "Guardando…" : "Continuar"}
          </Button>
          {error && <p className="w-full text-[14px] text-accent">{error}</p>}
          {!complete && (
            <button type="button" onClick={goToMissing} className="text-[13px] text-accent underline underline-offset-2">
              Faltan {missing.length} · ir al primero sin responder
            </button>
          )}
        </div>
      </div>
    </Shell>
  );
}
