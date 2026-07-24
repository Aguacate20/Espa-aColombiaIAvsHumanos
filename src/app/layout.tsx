import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { db } from "@/lib/supabase";
import "./globals.css";

export const metadata: Metadata = {
  title: "¿A quién acudirías?",
  description:
    "Estudio sobre confianza en inteligencia artificial · Universidad de La Sabana y Universitat de València",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

async function currentCountry(): Promise<string> {
  const id = cookies().get("pid")?.value;
  if (!id) return "CO";
  const { data } = await db.from("participants").select("country").eq("id", id).maybeSingle();
  return data?.country ?? "CO";
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const country = await currentCountry();
  return (
    <html lang="es" data-country={country}>
      <body>{children}</body>
    </html>
  );
}
