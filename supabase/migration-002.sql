-- =====================================================================
-- Migración 002 — identificación, confianza previa y estímulos
-- Ejecutar UNA vez en Supabase > SQL Editor, sobre el esquema ya creado.
-- Es idempotente: puedes correrla dos veces sin romper nada.
-- =====================================================================

-- ---- participants -----------------------------------------------------
alter table participants add column if not exists full_name    text;
alter table participants add column if not exists document_id  text;   -- tal como lo escribió
alter table participants add column if not exists document_norm text;  -- normalizado, para búsqueda
alter table participants add column if not exists screen_time  text;
alter table participants add column if not exists stimulus_set text;   -- 'hombre' | 'mujer'
alter table participants add column if not exists consent_at   timestamptz;

create unique index if not exists participants_document_norm_key
  on participants (document_norm) where document_norm is not null;

-- ---- scale_responses --------------------------------------------------
alter table scale_responses add column if not exists presented_index int;

-- ---- trials -----------------------------------------------------------
-- Género del interlocutor humano mostrado en cada ensayo (contrabalanceado).
alter table trials add column if not exists human_agent_gender text;

-- ---- vista de análisis (sin identificadores directos) -----------------
create or replace view v_trials_analysis as
select
  p.code, p.country, p.stimulus_set,
  t.block, t.trial_index, t.situation_id, t.situation_category,
  t.left_agent, t.right_agent, t.human_agent_gender,
  t.slider_value, t.preference_ia, t.choice, t.slider_moves, t.rt_ms,
  t.confidence, t.confidence_rt_ms, t.created_at
from trials t
join participants p on p.id = t.participant_id
where t.block = 'main'
order by p.code, t.trial_index;

-- Vista de identificación, separada a propósito: es la única que expone
-- nombre y documento. No la uses para análisis ni la exportes con los datos.
create or replace view v_identificacion as
select code, full_name, document_id, country, started_at, finished_at
from participants;
