-- =====================================================================
-- Migración 007 — titulación y salud psicológica (sociodemográficos)
-- Ejecutar en el proyecto del estudio > SQL Editor. Es idempotente.
-- =====================================================================

alter table participants
  add column if not exists degree        text,    -- carrera/profesión (CO) o titulación (ES), texto libre
  add column if not exists mh_status     text,    -- ¿problema psicológico o de salud mental? No / Sí, actualmente / Sí, en el pasado… / Prefiero no responder
  add column if not exists mh_diagnosed  text,    -- solo si mh_status es «Sí…»: Sí / No / Prefiero no responder
  add column if not exists mh_conditions text[],  -- solo si mh_status es «Sí…»: opciones marcadas
  add column if not exists mh_other      text;    -- texto de «Otro»
