/**
 * Venue Discovery types — categories, wait status, and Supabase venue shape.
 */

export const VENUE_CATEGORIES = [
  'restaurants',
  'coffee_shops',
  'bars',
  'gyms',
  'salons',
  'other',
] as const;

export type VenueCategory = (typeof VENUE_CATEGORIES)[number];

export const WAIT_CATEGORIES = ['no_wait', 'short', 'moderate', 'long'] as const;
export type WaitCategory = (typeof WAIT_CATEGORIES)[number];

export const WAIT_SOURCES = ['user', 'venue', 'google'] as const;
export type WaitSource = (typeof WAIT_SOURCES)[number];

export const DEFAULT_CATEGORY: VenueCategory = 'restaurants';

export interface Venue {
  id: string;
  name: string;
  category: VenueCategory;
  address: string | null;
  lat: number;
  lng: number;
  phone: string | null;
  website: string | null;
  latest_wait_category: WaitCategory | null;
  latest_wait_source: WaitSource | null;
  latest_wait_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Display label for category (tab text). */
export const CATEGORY_LABELS: Record<VenueCategory, string> = {
  restaurants: 'Restaurants',
  coffee_shops: 'Coffee',
  bars: 'Bars',
  gyms: 'Gyms',
  salons: 'Salons',
  other: 'Other',
};

/** Wait status for badge/marker color (SoW: green/yellow/orange/red/gray). */
export type WaitStatus = WaitCategory | 'no_data';

export const WAIT_STATUS_COLORS: Record<WaitStatus, string> = {
  no_wait: '#22c55e',
  short: '#eab308',
  moderate: '#f97316',
  long: '#ef4444',
  no_data: '#71717a',
};

export const WAIT_STATUS_LABELS: Record<WaitStatus, string> = {
  no_wait: 'No wait',
  short: 'Short wait',
  moderate: 'Moderate wait',
  long: 'Long wait',
  no_data: 'No data',
};

/** Compact labels for list cards (design: No Wait, ~5 min, ~20 min, 35+ min). */
export const WAIT_STATUS_LIST_LABELS: Record<WaitStatus, string> = {
  no_wait: 'No Wait',
  short: '~5 min',
  moderate: '~20 min',
  long: '35+ min',
  no_data: 'No data',
};

export function getWaitStatus(venue: Venue): WaitStatus {
  return venue.latest_wait_category ?? 'no_data';
}
