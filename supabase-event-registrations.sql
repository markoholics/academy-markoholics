-- Run in Supabase → SQL Editor → New Query → Run
-- Creates the AI_search_registrations table for the webinar landing page.

create table if not exists public."AI_search_registrations" (
  id              uuid        default gen_random_uuid() primary key,
  created_at      timestamptz default now() not null,
  full_name       text        not null,
  email           text        not null,
  contact_number  text        not null,
  company         text        not null,
  company_url     text,
  designation     text        not null
);

alter table public."AI_search_registrations" enable row level security;

create policy "allow_anon_insert"
  on public."AI_search_registrations"
  for insert to anon
  with check (true);

create policy "allow_auth_select"
  on public."AI_search_registrations"
  for select to authenticated
  using (true);

create index if not exists idx_ai_reg_email
  on public."AI_search_registrations" (email);
