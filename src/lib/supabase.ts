import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  // Falla ruidosamente en build/arranque en lugar de escribir en el vacío.
  throw new Error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY. Revisa las variables de entorno en Vercel.",
  );
}

/**
 * Cliente de servicio. SOLO se usa desde route handlers (/src/app/api/**).
 * Nunca se importa desde un componente cliente: "server-only" lo garantiza.
 */
export const db = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
