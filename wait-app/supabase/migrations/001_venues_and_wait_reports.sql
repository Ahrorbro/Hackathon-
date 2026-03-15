-- Venue Discovery + Wait Time: venues and wait_reports
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query).

-- venues: core listing and latest wait display
create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('restaurants', 'coffee_shops', 'bars', 'gyms', 'salons', 'other')),
  address text,
  lat double precision not null,
  lng double precision not null,
  phone text,
  website text,
  latest_wait_category text check (latest_wait_category is null or latest_wait_category in ('no_wait', 'short', 'moderate', 'long')),
  latest_wait_source text check (latest_wait_source is null or latest_wait_source in ('user', 'venue', 'google')),
  latest_wait_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_venues_category on public.venues (category);
create index if not exists idx_venues_lat_lng on public.venues (lat, lng);

-- wait_reports: individual reports; app or trigger can update venues.latest_wait_*
create table if not exists public.wait_reports (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues (id) on delete cascade,
  reported_by_user_id uuid,
  wait_category text not null check (wait_category in ('no_wait', 'short', 'moderate', 'long')),
  source text not null check (source in ('user', 'venue', 'google')),
  created_at timestamptz default now()
);

create index if not exists idx_wait_reports_venue_created on public.wait_reports (venue_id, created_at desc);

-- RLS: public read for listing/detail
alter table public.venues enable row level security;
alter table public.wait_reports enable row level security;

create policy "venues_select" on public.venues for select using (true);
create policy "wait_reports_select" on public.wait_reports for select using (true);

-- Writes: authenticated only (add specific policies when implementing submit/claim)
create policy "venues_insert" on public.venues for insert with check (true);
create policy "venues_update" on public.venues for update using (true);
create policy "wait_reports_insert" on public.wait_reports for insert with check (true);
