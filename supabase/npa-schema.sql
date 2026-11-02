-- =====================================================================
-- BASE DE NPA — proyecto de Supabase SEPARADO del estudio
-- Crea un proyecto nuevo (p. ej. "UV-NPA-creditos"), ábrelo y ejecuta este
-- archivo completo en su SQL Editor. NO lo ejecutes en el proyecto principal.
--
-- Diseño para el anonimato:
--   · No hay ninguna columna que apunte al estudio (ni código, ni id).
--   · No se guarda fecha ni hora.
--   · El hash del token y el NPA van en tablas distintas, con ids aleatorios.
--   · Exporta siempre la lista ORDENADA POR NPA (vista v_npa_lista), nunca
--     en orden de inserción, para no reproducir el orden de finalización.
-- =====================================================================

create extension if not exists "pgcrypto";

-- Tokens ya usados (impide registrar dos veces con el mismo token)
create table if not exists npa_tokens_usados (
  token_hash text primary key
);

-- NPA registrados
create table if not exists npa_creditos (
  id  uuid primary key default gen_random_uuid(),
  npa text not null check (char_length(npa) between 1 and 100)   -- sin formato fijo
);

alter table npa_tokens_usados enable row level security;
alter table npa_creditos      enable row level security;
-- (sin policies = sin acceso para anon/authenticated; la app usa service_role)

-- Registro atómico: o se guardan las dos cosas o ninguna.
create or replace function registrar_npa(p_token_hash text, p_npa text)
returns text
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into npa_tokens_usados (token_hash) values (p_token_hash);
  insert into npa_creditos (npa) values (p_npa);
  return 'ok';
exception
  when unique_violation then
    return 'usado';
end;
$$;

revoke all on function registrar_npa(text, text) from public, anon, authenticated;
grant execute on function registrar_npa(text, text) to service_role;

-- Lista para el profesorado: un NPA por fila, ordenada alfabéticamente.
create or replace view v_npa_lista with (security_invoker = true) as
select npa, count(*) as veces_registrado
from npa_creditos
group by npa
order by npa;

revoke all on v_npa_lista from anon, authenticated;
