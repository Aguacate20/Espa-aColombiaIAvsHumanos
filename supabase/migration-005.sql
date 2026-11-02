-- =====================================================================
-- Migración 005 — tiempo fuera de la tarea por ensayo
-- Ejecutar en el proyecto del estudio > SQL Editor. Es idempotente.
-- =====================================================================

-- ms que el participante pasó FUERA de la tarea mientras elegía
-- (cambió de app o de pestaña, o la ventana perdió el foco).
-- Un ensayo con away_ms > 0 tiene el RT contaminado: excluir del DDM.
alter table trials add column if not exists away_ms int;

drop view if exists v_trials_analysis;

create view v_trials_analysis with (security_invoker = true) as
select
  p.code, p.country, p.stimulus_set,
  p.device_reported, p.device_detected, p.pointer_coarse, p.viewport_w,
  t.block, t.trial_index, t.situation_id, t.situation_category,
  t.left_agent, t.right_agent, t.human_agent_gender,
  t.slider_value, t.preference_ia, t.choice, t.slider_moves,
  t.first_move_ms, t.rt_ms, t.input_pointer_type, t.away_ms,
  t.confidence, t.confidence_rt_ms, t.created_at
from trials t
join participants p on p.id = t.participant_id
where t.block = 'main'
order by p.code, t.trial_index;
