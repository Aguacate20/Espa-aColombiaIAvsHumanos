"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Shell, Title, Button } from "@/components/Shell";
import { LikertItem } from "@/components/Likert";
import { CEIA9 } from "@/data/scales/ceia9";
import { COPY, type Country } from "@/data/copy";

export function Ceia9Form({ country }: { country: Country }) {
  const router = useRouter();
  const c = COPY[country];
  const pages = CEIA9.pages;
  const anchors = CEIA9.anchors[country];

  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const t0 = useRef(performance.now());

  // Repuebla lo ya respondido (reanudar) y salta a la primera página incompleta
  useEffect(() => {
    fetch("/api/scale?scale=CEIA9")
      .then((r) => r.json())
      .then((j) => {
        if (!j.ok) return;
        setAnswers(j.answers ?? {});
        const first = pages.findIndex((items) => items.some((it) => j.answers?.[it.code] === undefined));
        setPage(first === -1 ? pages.length - 1 : first);
      })
      .catch(() => {});
  }, [pages]);

  useEffect(() => {
    t0.current = performance.now();
    window.scrollTo({ top: 0 });
  }, [page]);

  const items = pages[page];
  const complete = items.every((it) => answers[it.code] !== undefined);
  const isLast = page === pages.length - 1;
  const answered = Object.keys(answers).length;

  async function next() {
    setBusy(true);
    const payload: Record<string, number> = {};
    items.forEach((it) => (payload[it.code] = answers[it.code]));

    await fetch("/api/scale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scale: "CEIA9",
        answers: payload,
        pageRtMs: Math.round(performance.now() - t0.current),
        done: isLast,
      }),
    });

    setBusy(false);
    if (isLast) router.push("/experimento/familiarizacion");
    else setPage((p) => p + 1);
  }

  return (
    <Shell progress={0.16 + 0.24 * (answered / CEIA9.items.length)} step={`3 de 5 · ${answered}/${CEIA9.items.length}`}>
      <div className="fade-in">
        <Title>{c.scaleTitle}</Title>
        {page === 0 && <p className="max-w-measure text-[16px] text-muted mb-8">{CEIA9.instructions[country]}</p>}

        <div className="mt-6">
          {items.map((it, i) => (
            <LikertItem
              key={it.code}
              name={it.code}
              index={page * 6 + i + 1}
              text={it.text[country]}
              anchors={anchors}
              value={answers[it.code]}
              onChange={(v) => setAnswers((a) => ({ ...a, [it.code]: v }))}
            />
          ))}
        </div>

        <div className="border-t border-line pt-8 flex items-center gap-3">
          {page > 0 && (
            <Button variant="ghost" onClick={() => setPage((p) => p - 1)}>
              {c.backCta}
            </Button>
          )}
          <Button onClick={next} disabled={!complete || busy}>
            {busy ? "Guardando…" : c.continueCta}
          </Button>
          {!complete && <span className="text-[13px] text-muted">Responde todos los enunciados para continuar.</span>}
        </div>
      </div>
    </Shell>
  );
}
