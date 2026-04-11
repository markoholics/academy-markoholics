-- Run this in Supabase → SQL Editor to add Razorpay columns to the enrollments table.

alter table public.enrollments
  add column if not exists razorpay_order_id   text,
  add column if not exists razorpay_payment_id  text;

-- Index for quick lookups by payment ID
create index if not exists idx_enrollments_payment_id
  on public.enrollments (razorpay_payment_id);
