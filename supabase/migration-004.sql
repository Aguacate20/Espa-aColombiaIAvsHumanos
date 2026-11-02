-- =====================================================================
-- Migración 004 — anonimato, dispositivo, DERS-SF y token de NPA
-- Ejecutar UNA vez en el proyecto principal (EspañaColombiaIAvsHumanos)
-- > SQL Editor. Es idempotente.
-- =====================================================================

-- ---- 1. Participación anónima ---------------------------------------
-- Ya no se piden nombre, documento ni correo. Las columnas se conservan
-- (vacías) para no romper filas antiguas; la vista que las exponía se elimina.
drop view if exists v_identificacion;
drop index if exists participants_document_norm_key;

-- Si había filas de PRUEBA con nombre/documento/correo, puedes vaciarlas así
-- (revisa antes; no se ejecuta solo):
--   update participants set full_name = null, document_id = null, document_norm = null, email = null;

-- ---- 2. Dispositivo (se registra tras el consentimiento) ------------
alter table participants add column if not exists device_reported    text;     -- 'pc' | 'movil' | 'tableta' (lo que declara)
alter table participants add column if not exists device_detected    text;     -- 'pc' | 'movil' | 'tableta' (clasificación automática)
alter table participants add column if not exists pointer_coarse     boolean;  -- matchMedia('(pointer: coarse)')
alter table participants add column if not exists any_pointer_coarse boolean;  -- matchMedia('(any-pointer: coarse)')
alter table participants add column if not exists any_pointer_fine   boolean;  -- matchMedia('(any-pointer: fine)')
alter table participants add column if not exists hover_none         boolean;  -- matchMedia('(hover: none)')
alter table participants add column if not exists max_touch_points   int;
alter table participants add column if not exists screen_w           int;
alter table participants add column if not exists screen_h           int;
alter table participants add column if not exists viewport_w         int;
alter table participants add column if not exists viewport_h         int;
alter table participants add column if not exists device_pixel_ratio numeric;
alter table participants add column if not exists orientation        text;     -- 'portrait' | 'landscape'
alter table participants add column if not exists ua_mobile          boolean;  -- userAgentData.mobile (null en Safari/Firefox)
alter table participants add column if not exists platform           text;
-- user_agent ya existía.

-- ---- 3. Por ensayo: modalidad de entrada y primer movimiento --------
alter table trials add column if not exists input_pointer_type text;  -- 'mouse' | 'touch' | 'pen' | 'keyboard'
alter table trials add column if not exists first_move_ms      int;   -- ms desde que aparece la situación hasta el primer movimiento del slider

-- ---- 4. Token de NPA (España) ----------------------------------------
-- Solo indica que se emitió el token. El token y el NPA viven en OTRA base.
alter table participants add column if not exists npa_token_issued boolean not null default false;

-- ---- 5. Vistas --------------------------------------------------------
-- Se eliminan y recrean porque cambian sus columnas.
drop view if exists v_trials_analysis;
drop view if exists v_scale_scores;

create view v_trials_analysis with (security_invoker = true) as
select
  p.code, p.country, p.stimulus_set,
  p.device_reported, p.device_detected, p.pointer_coarse, p.viewport_w,
  t.block, t.trial_index, t.situation_id, t.situation_category,
  t.left_agent, t.right_agent, t.human_agent_gender,
  t.slider_value, t.preference_ia, t.choice, t.slider_moves,
  t.first_move_ms, t.rt_ms, t.input_pointer_type,
  t.confidence, t.confidence_rt_ms, t.created_at
from trials t
join participants p on p.id = t.participant_id
where t.block = 'main'
order by p.code, t.trial_index;

-- DERSSF tiene 3 ítems inversos (subescala AWA, escala 1-5): se recodifican
-- aquí (6 - valor). scale_responses.value siempre guarda la respuesta cruda.
create view v_scale_scores with (security_invoker = true) as
select
  p.code,
  p.country,
  s.scale,
  s.subscale,
  round(avg(case when s.reverse_scored and s.scale = 'DERSSF' then 6 - s.value else s.value end)::numeric, 3) as media,
  count(*) as n_items
from scale_responses s
join participants p on p.id = s.participant_id
group by p.code, p.country, s.scale, s.subscale
order by p.code, s.scale, s.subscale;

-- Identificadores de escala nuevos (scale_responses.scale):
--   DERSSF  dificultades en la regulación emocional (18 ítems, 1-5)
--           AWA (inversos) / CLA / GOA / IMP / NAC / STR — sustituye a ERQ10
