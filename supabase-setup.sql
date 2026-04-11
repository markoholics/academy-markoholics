-- Run this in Supabase → SQL Editor → New Query → Run
-- Creates the full enrollments table with all columns including Razorpay fields.

create table if not exists public.enrollments (
  id                   uuid        default gen_random_uuid() primary key,
  created_at           timestamptz default now() not null,
  full_name            text        not null,
  email                text        not null,
  whatsapp             text        not null,
  role                 text,
  college_or_company   text,
  city                 text,
  selected_tier        text        not null,
  tier_price           text        not null,
  payment_status       text        default 'pending' not null,
  razorpay_order_id    text,
  razorpay_payment_id  text
);

alter table public.enrollments enable row level security;

create policy "allow_anon_insert"
  on public.enrollments
  for insert to anon
  with check (true);

create policy "allow_auth_select"
  on public.enrollments
  for select to authenticated
  using (true);

create index if not exists idx_enrollments_payment_id
  on public.enrollments (razorpay_payment_id);
