"use client";

import { useEffect } from "react";

/** Asegura el cierre en el servidor si la llamada del último ensayo se perdió (idempotente). */
export function FinishSync() {
  useEffect(() => {
    fetch("/api/finish", { method: "POST" }).catch(() => null);
  }, []);
  return null;
}
