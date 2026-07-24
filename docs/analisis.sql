-- Consultas de trabajo. Ejecutar en Supabase > SQL Editor.

-- 1. Estado del reclutamiento por país
select country,
       count(*) filter (where finished_at is not null) as completos,
       count(*) filter (where finished_at is null)     as en_curso,
       count(*)                                        as total
from participants
group by country;

-- 2. Preferencia media hacia la IA por nivel y país
select p.country,
       t.situation_category,
       round(avg(t.preference_ia)::numeric, 1) as pref_ia_media,
       round(avg(t.confidence)::numeric, 2)    as confianza_media,
       round(avg(t.rt_ms)::numeric, 0)         as rt_medio_ms,
       count(*)                                as n
from trials t
join participants p on p.id = t.participant_id
where t.block = 'main'
group by p.country, t.situation_category
order by p.country, t.situation_category;

-- 3. Comprobación del contrabalanceo de lados (debe rondar 0.5)
select p.code,
       round(avg((t.left_agent = 'ia')::int)::numeric, 2) as prop_ia_izquierda,
       count(*) as n
from trials t
join participants p on p.id = t.participant_id
where t.block = 'main'
group by p.code
order by prop_ia_izquierda;

-- 4. Puntuaciones de subescala CEIA-9
select p.code, p.country, s.subscale,
       round(avg(s.value)::numeric, 2) as media,
       count(*) as n_items
from scale_responses s
join participants p on p.id = s.participant_id
where s.scale = 'CEIA9'
group by p.code, p.country, s.subscale
order by p.code, s.subscale;

-- 5. Exportación ancha para DDM (una fila por ensayo)
select p.code, p.country, p.age, p.gender, p.education, p.ai_use_frequency,
       t.trial_index, t.situation_id, t.situation_category,
       t.left_agent, t.preference_ia, t.choice, t.rt_ms, t.slider_moves,
       t.confidence, t.confidence_rt_ms
from trials t
join participants p on p.id = t.participant_id
where t.block = 'main'
  and p.finished_at is not null
order by p.code, t.trial_index;
