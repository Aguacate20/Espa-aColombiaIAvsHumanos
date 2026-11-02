-- =====================================================================
-- Esquema Supabase — Estudio Colombia/España "¿A quién acudirías?"
-- Universidad de La Sabana · Universitat de València
-- Ejecutar completo en Supabase Studio > SQL Editor.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- PARTICIPANTES
-- ---------------------------------------------------------------------
create table if not exists participants (
  id                uuid primary key default gen_random_uuid(),
  code              text unique not null,          -- codigo legible: CO-7F3K2
  country           text check (country in ('CO','ES')),
  seed              bigint not null,               -- semilla de aleatorizacion
  trial_plan        jsonb,                         -- orden fijo por participante
  current_step      text not null default 'demographics',

  -- Datos de identificacion / demograficos
  age               int,
  gender            text,
  gender_other      text,
  education         text,
  occupation        text,
  degree            text,                          -- migración 007
  mh_status         text,                          -- migración 007
  mh_diagnosed      text,                          -- migración 007
  mh_conditions     text[],                        -- migración 007
  mh_other          text,                          -- migración 007
  email             text,
  ai_use_frequency  text,

  consent           boolean not null default false,
  user_agent        text,
  started_at        timestamptz not null default now(),
  finished_at       timestamptz,
  updated_at        timestamptz not null default now()
);

create index if not exists participants_country_idx on participants (country);

-- ---------------------------------------------------------------------
-- RESPUESTAS A ESCALAS (formato largo, una fila por item)
-- ---------------------------------------------------------------------
create table if not exists scale_responses (
  id             bigserial primary key,
  participant_id uuid not null references participants(id) on delete cascade,
  scale          text not null,        -- 'CEIA9'
  subscale       text,                 -- 'AP' | 'VE' | 'RA' | 'VS'
  item_code      text not null,        -- 'AP1'
  value          int  not null,        -- 1..5
  reverse_scored boolean not null default false,
  page_rt_ms     int,
  answered_at    timestamptz not null default now(),
  unique (participant_id, scale, item_code)
);

create index if not exists scale_responses_participant_idx on scale_responses (participant_id);

-- ---------------------------------------------------------------------
-- ENSAYOS DEL EXPERIMENTO
-- ---------------------------------------------------------------------
create table if not exists trials (
  id                 bigserial primary key,
  participant_id     uuid not null references participants(id) on delete cascade,
  block              text not null default 'main',   -- 'practice' | 'main'
  trial_index        int  not null,                  -- posicion presentada (0-based)
  situation_id       text not null,                  -- 'S04'
  situation_category text,                           -- resuelto en SERVIDOR, nunca en el cliente
  left_agent         text not null,                  -- 'ia' | 'humano'
  right_agent        text not null,

  slider_value       int,        -- 0..100 crudo (0 = extremo izquierdo)
  preference_ia      int,        -- 0..100 normalizado hacia IA
  choice             text,       -- 'ia' | 'humano' | 'neutral'
  slider_moves       int,        -- n de ajustes antes de confirmar
  rt_ms              int,        -- desde render hasta confirmar

  confidence         int check (confidence between 0 and 10),
  confidence_rt_ms   int,

  created_at         timestamptz not null default now(),
  unique (participant_id, block, situation_id)
);

create index if not exists trials_participant_idx on trials (participant_id, block, trial_index);

-- ---------------------------------------------------------------------
-- RLS: todo el acceso pasa por route handlers con service_role.
-- Se bloquea explicitamente cualquier acceso anon/authenticated.
-- ---------------------------------------------------------------------
alter table participants     enable row level security;
alter table scale_responses  enable row level security;
alter table trials           enable row level security;
-- (sin policies = sin acceso para anon/authenticated; service_role las omite)

-- ---------------------------------------------------------------------
-- VISTA ANCHA PARA ANALISIS
-- ---------------------------------------------------------------------
create or replace view v_trials_analysis as
select
  p.code,
  p.country,
  t.block,
  t.trial_index,
  t.situation_id,
  t.situation_category,
  t.left_agent,
  t.right_agent,
  t.slider_value,
  t.preference_ia,
  t.choice,
  t.rt_ms,
  t.confidence,
  t.confidence_rt_ms,
  t.created_at
from trials t
join participants p on p.id = t.participant_id
where t.block = 'main'
order by p.code, t.trial_index;
