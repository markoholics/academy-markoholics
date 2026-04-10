-- Run this in your Supabase project:
-- Dashboard → SQL Editor → New Query → paste → Run

create table if not exists public.enrollments (
  id                 uuid        default gen_random_uuid() primary key,
  created_at         timestamptz default now() not null,
  full_name          text        not null,
  email              text        not null,
  whatsapp           text        not null,
  current_role       text,
  college_or_company text,
  city               text,
  selected_tier      text        not null,
  tier_price         text        not null,
  payment_status     text        default 'pending' not null
);

-- Row-level security: allow anyone to insert (form submissions), no public reads
alter table public.enrollments enable row level security;

create policy "allow_anon_insert"
  on public.enrollments
  for insert
  to anon
  with check (true);

-- You (authenticated, via Supabase dashboard) can read all rows
create policy "allow_auth_select"
  on public.enrollments
  for select
  to authenticated
  using (true);
