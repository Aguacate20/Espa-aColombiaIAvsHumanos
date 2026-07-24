# ¿A quién acudirías?

Instrumento experimental Colombia–España sobre confianza en inteligencia artificial.
**Universidad de La Sabana** · **Universitat de València**

Next.js 14 (App Router) · Supabase (Postgres) · Vercel

---

## 1. Subirlo a GitHub con Git Bash

Descomprime la carpeta en `~/OneDrive/Documents/GitHub/` y desde Git Bash:

```bash
cd ~/OneDrive/Documents/GitHub/sabana-uv-confianza

git init
git add .
git commit -m "Instrumento CO/ES: bifurcación por país, CEIA-9 y bloque experimental"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/sabana-uv-confianza.git
git push -u origin main
```

Crea antes el repositorio **vacío** en GitHub (sin README, sin .gitignore).

---

## 2. Supabase

1. Crea un proyecto nuevo.
2. SQL Editor → pega y ejecuta `supabase/schema.sql` completo.
3. Project Settings → API. Copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

La `service_role` **solo** se usa en los route handlers del servidor. RLS está activo y sin políticas, así que ningún cliente anónimo puede leer ni escribir.

---

## 3. Vercel

Importa el repo y añade las dos variables de entorno en Settings → Environment Variables (Production y Preview). Deploy.

Local:

```bash
cp .env.example .env.local   # rellena los valores
npm install
npm run dev
```

---

## 4. Cómo está montado el protocolo

| Paso | Ruta | Qué pasa |
|---|---|---|
| 1 | `/` | Consentimiento |
| 2 | `/participante` | Datos del participante → crea la fila y la cookie de sesión |
| 3 | `/pais` | **Bifurcación Colombia / España** → congela el plan de ensayos |
| 4 | `/escalas/ceia9` | CEIA-9, 24 ítems en 4 páginas |
| 5 | `/experimento/familiarizacion` | Presentación de los dos interlocutores |
| 6 | `/experimento/practica` | Ensayo de práctica (bloque `practice`, fuera del análisis) |
| 7 | `/experimento` | 27 situaciones + confianza 0–10 después de cada una |
| 8 | `/fin` | Cierre |

---

## 5. Decisiones que conviene conocer antes de tocar el código

### Las etiquetas nunca llegan al navegador
`src/data/situations.ts` empieza con `import "server-only"`: si alguien lo importa desde un componente cliente, **el build falla**. El cliente recibe únicamente `{ id, text }`. La categoría (`epistemica` / `mediacion` / `autotelica`) se resuelve en `/api/trial` a partir del `situation_id` y se escribe directamente en la columna `trials.situation_category`. Así el análisis queda etiquetado sin que el participante pueda verlo ni inspeccionando la red.

Los ids además están **intercalados** a propósito: `S01` es de mediación, `S02` epistémica, `S03` autotélica. Ni el orden ni el número delatan el nivel. El mapa completo está en `docs/codebook.md`.

### Aleatorización reproducible y reanudable
Al elegir país se genera **una sola vez** el plan completo (orden de situaciones + lado de cada agente) y se guarda en `participants.trial_plan`. Si el participante cierra el navegador y vuelve tres días después, ve exactamente el mismo orden y los mismos lados. La reanudación se calcula comparando el plan con las filas ya guardadas en `trials`.

El lado está **contrabalanceado**, no solo aleatorizado: cada participante ve la IA a la izquierda en la mitad de los ensayos (14 de 27) y a la derecha en la otra mitad. Con azar puro, algún participante acabaría con 21 de 27 al mismo lado.

### El slider no tiene valor por defecto
Arranca en el centro con el pulsador de borde punteado y el botón deshabilitado hasta que el participante lo mueve. Se registra `slider_value` (0–100 crudo), `preference_ia` (0–100 normalizado hacia la IA, ya corregido por el lado), `slider_moves` y `rt_ms`.

`preference_ia` es la variable que debes usar en el análisis: `slider_value` depende del lado en que cayó cada agente.

### El color institucional no toca la zona de respuesta
El tema por país (`[data-country="ES"]` en `globals.css`) cambia la cabecera, la barra de progreso y los botones. Los dos interlocutores comparten tipografía, peso, tamaño y color exactos: cualquier asimetría visual sería una fuente de sesgo de lado.

---

## 6. Pendientes que tienes que revisar

- **Colores institucionales.** `src/app/globals.css` tiene valores provisionales marcados con `REEMPLAZAR`. Sustitúyelos por los hex oficiales de La Sabana y de la Universitat de València.
- **Dos ítems adaptados para España** (marcados con `adapted: true` en `src/data/situations.ts`):
  - `S04` bombillo → bombilla
  - `S23` árbol de mango → árbol frutal
  Conviene validarlos con el equipo de València antes de recoger datos.
- **Son 27 situaciones, no 30.** Nueve por nivel. Si quieres llegar a 30 tienes que añadir una por nivel para mantener el diseño balanceado.
- **Consentimiento informado.** El texto de `/` es un marcador de posición. Sustitúyelo por el aprobado por el comité de ética de cada institución.
- **Faltan las escalas restantes**: HGAITS-24, MCS-12, AIAS-15, UCLA-3, MSPSS-12, SIAS-6, ERQ-10. Ver sección 7.

---

## 7. Cómo añadir la siguiente escala

1. Copia `src/data/scales/ceia9.ts` a `src/data/scales/loquesea.ts` y cambia ítems, anclas y número de puntos.
2. Copia la carpeta `src/app/escalas/ceia9/` a `src/app/escalas/loquesea/`.
3. Añade el paso en `src/lib/flow.ts` (`STEPS` y `STEP_PATH`), en el orden que quieras.
4. En `src/app/api/scale/route.ts`, añade el mapa de subescalas de la nueva escala.

El esquema de `scale_responses` es de formato largo y ya soporta cualquier escala: no hay que tocar SQL.

---

## 8. Extraer los datos

En Supabase, SQL Editor:

```sql
select * from v_trials_analysis;                 -- ensayos, formato largo
select * from scale_responses where scale='CEIA9';
select code, country, age, gender, education, ai_use_frequency, finished_at from participants;
```

Botón **Download CSV**. Para R/Python, `v_trials_analysis` ya viene lista para el DDM: una fila por ensayo, con `rt_ms`, `choice`, `preference_ia`, `situation_category` y `confidence`.
