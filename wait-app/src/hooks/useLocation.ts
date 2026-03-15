import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';

export type LocationState = {
  label: string;
  coords: { latitude: number; longitude: number } | null;
  permission: 'granted' | 'denied' | 'pending';
  manualEntry: string;
};

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    label: 'Location',
    coords: null,
    permission: 'pending',
    manualEntry: '',
  });

  const requestPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setState((s) => ({ ...s, permission: status === 'granted' ? 'granted' : 'denied' }));
    if (status === 'granted') {
      try {
        const loc = await Location.getCurrentPositionAsync({});
        setState((s) => ({
          ...s,
          coords: loc.coords,
          label: `${loc.coords.latitude.toFixed(2)}, ${loc.coords.longitude.toFixed(2)}`,
        }));
      } catch {
        setState((s) => ({ ...s, coords: null, label: 'Location' }));
      }
    }
    return status;
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      setState((s) => ({ ...s, permission: status === 'granted' ? 'granted' : 'denied' }));
      if (status === 'granted') {
        try {
          const loc = await Location.getCurrentPositionAsync({});
          setState((s) => ({
            ...s,
            coords: loc.coords,
            label: `${loc.coords.latitude.toFixed(2)}, ${loc.coords.longitude.toFixed(2)}`,
          }));
        } catch {
          setState((s) => ({ ...s, coords: null, label: 'Location' }));
        }
      }
    })();
  }, []);

  const setManualEntry = useCallback((cityOrZip: string) => {
    setState((s) => ({ ...s, manualEntry: cityOrZip, label: cityOrZip || 'Location' }));
  }, []);

  return { ...state, requestPermission, setManualEntry };
}
