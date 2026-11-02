-- =====================================================================
-- Migración 006 — NPA sin formato fijo
-- Ejecutar en el proyecto donde están las tablas del NPA. Idempotente.
-- =====================================================================
-- Antes solo se aceptaban letras mayúsculas, números y guiones (4–20).
-- Ahora se acepta cualquier texto de 1 a 100 caracteres.
alter table npa_creditos drop constraint if exists npa_creditos_npa_check;
alter table npa_creditos add constraint npa_creditos_npa_check
  check (char_length(npa) between 1 and 100);
