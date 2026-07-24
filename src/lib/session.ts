import "server-only";
import { cookies } from "next/headers";
import { db } from "./supabase";
import type { Country } from "@/data/copy";
import type { StimulusSet } from "@/data/stimuli";

export const COOKIE = "pid";

export interface Participant {
  id: string;
  code: string;
  country: Country | null;
  seed: number;
  trial_plan:
    | { i: number; situationId: string; left: "ia" | "humano"; right: "ia" | "humano"; humanGender: "hombre" | "mujer" }[]
    | null;
  current_step: string;
  finished_at: string | null;
  gender: string | null;
  stimulus_set: StimulusSet | null;
  consent: boolean;
}

const SELECT = "id, code, country, seed, trial_plan, current_step, finished_at, gender, stimulus_set, consent";

export async function setParticipantCookie(id: string) {
  cookies().set(COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 60, // 60 días
  });
}

export function getParticipantId(): string | null {
  return cookies().get(COOKIE)?.value ?? null;
}

export async function getParticipant(): Promise<Participant | null> {
  const id = getParticipantId();
  if (!id) return null;
  const { data, error } = await db.from("participants").select(SELECT).eq("id", id).maybeSingle();
  if (error || !data) return null;
  return data as Participant;
}

export async function setStep(id: string, step: string) {
  await db.from("participants").update({ current_step: step, updated_at: new Date().toISOString() }).eq("id", id);
}

/** Normaliza el documento para la búsqueda: sin puntos, espacios ni guiones. */
export function normalizeDocument(raw: string): string {
  return raw.replace(/[\s.\-_/]/g, "").toUpperCase();
}

export function normalizeName(raw: string): string {
  return raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}
