-- =====================================================================
-- Migración 003 — cuestionarios restantes
-- =====================================================================
-- No requiere cambios de tabla: scale_responses es de formato largo y ya
-- acepta cualquier escala. Este archivo solo documenta los identificadores
-- de escala que empezarán a aparecer, y añade una vista de puntuaciones por
-- subescala para todos los cuestionarios.
--
-- Identificadores (columna scale_responses.scale):
--   PRE     confianza previa (5 ítems, 1-5; KNOW es covariable, no promediar)
--   CEIA9   confianza emocional en IA (24 ítems, 1-5)
--   HGAITS  confianza en IA generativa (9 ítems, 1-5) — BEN/COM/REC
--   MCS     conexión maquínica (12 ítems, 1-7) — EE/CC
--   AIAS    apego a la IA (15 ítems, 1-5) — EC/SS/NR
--   UCLA3   soledad (3 ítems, 1-3) — LON
--   EMASP   apoyo social percibido (12 ítems, 1-6) — SO/FAM/FRI
--   SIAS6   ansiedad social (6 ítems, 0-4) — SIAS
--   ERQ10   regulación emocional (10 ítems, 1-7) — REA/SUP
-- =====================================================================

-- Puntuaciones medias por participante, escala y subescala.
-- OJO: son medias de ítems crudos; los ítems inversos, si los hubiera, deben
-- recodificarse en el análisis antes de interpretar. Ninguna de estas escalas
-- tiene ítems inversos en esta implementación.
create or replace view v_scale_scores as
select
  p.code,
  p.country,
  s.scale,
  s.subscale,
  round(avg(s.value)::numeric, 3) as media,
  count(*)                        as n_items
from scale_responses s
join participants p on p.id = s.participant_id
group by p.code, p.country, s.scale, s.subscale
order by p.code, s.scale, s.subscale;

-- Formato ancho: un ítem por columna, para exportar a SPSS/R.
-- (Se genera bajo demanda; aquí queda la consulta base por si la necesitas.)
--   select participant_id, scale, item_code, value
--   from scale_responses order by participant_id, scale, item_code;
