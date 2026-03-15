import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { haversineKm } from '../lib/geo';
import type { Venue, VenueCategory } from '../types/venues';

export interface UseVenuesParams {
  category: VenueCategory;
  lat: number | null;
  lng: number | null;
  searchQuery?: string;
}

export interface UseVenuesResult {
  venues: Venue[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useVenues({
  category,
  lat,
  lng,
  searchQuery = '',
}: UseVenuesParams): UseVenuesResult {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVenues = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('venues')
        .select('*')
        .eq('category', category)
        .order('name');

      if (err) {
        setError(err.message);
        setVenues([]);
        return;
      }

      let list = (data ?? []) as Venue[];

      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        list = list.filter((v) => v.name.toLowerCase().includes(q));
      }

      if (lat != null && lng != null) {
        list = [...list].sort((a, b) => {
          const dA = haversineKm(lat, lng, a.lat, a.lng);
          const dB = haversineKm(lat, lng, b.lat, b.lng);
          return dA - dB;
        });
      }

      setVenues(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load venues');
      setVenues([]);
    } finally {
      setLoading(false);
    }
  }, [category, lat, lng, searchQuery]);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return { venues, loading, error, refetch: fetchVenues };
}
