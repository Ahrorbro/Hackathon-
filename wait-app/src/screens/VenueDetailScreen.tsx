import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';
import type { Venue } from '../types/venues';
import type { RootStackParamList } from '../types/navigation';
import {
  getWaitStatus,
  WAIT_STATUS_COLORS,
  WAIT_STATUS_LABELS,
  CATEGORY_LABELS,
} from '../types/venues';
import { theme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'VenueDetail'>;

const MIN_BUTTON_HEIGHT = 48;

export function VenueDetailScreen({ route, navigation }: Props) {
  const { venueId } = route.params;
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    void (async () => {
      try {
        const { data, error: err } = await supabase
          .from('venues')
          .select('*')
          .eq('id', venueId)
          .single();
        if (cancelled) return;
        if (err) {
          setError(err.message);
          setVenue(null);
        } else {
          setVenue(data as Venue);
        }
      } catch {
        if (!cancelled) setError('Failed to load venue');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [venueId]);

  const openDirections = () => {
    if (!venue) return;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Could not open maps'));
  };

  const openPhone = () => {
    if (!venue?.phone) return;
    Linking.openURL(`tel:${venue.phone}`).catch(() =>
      Alert.alert('Error', 'Could not open phone')
    );
  };

  const openWebsite = () => {
    if (!venue?.website) return;
    const url = venue.website.startsWith('http') ? venue.website : `https://${venue.website}`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Could not open link'));
  };

  const handleUpdateWaitTime = () => {
    // TODO Phase 3: open Update Wait Time bottom sheet
    Alert.alert('Coming soon', 'Update wait time will be available in the next phase.');
  };

  const handleClaimVenue = () => {
    // TODO Phase 4: open Claim modal
    Alert.alert('Coming soon', 'Claim this venue will be available in the next phase.');
  };

  if (loading && !venue) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !venue) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error ?? 'Venue not found'}</Text>
          <Pressable
            style={({ pressed }) => [styles.backBtn, pressed && styles.buttonPressed]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backBtnText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const status = getWaitStatus(venue);
  const statusColor = WAIT_STATUS_COLORS[status];
  const statusLabel = WAIT_STATUS_LABELS[status];
  const lastUpdated = venue.latest_wait_at
    ? new Date(venue.latest_wait_at).toLocaleString()
    : null;
  const openClosed = 'Open'; // MVP: stub; DETAIL-02 can use opening_hours later

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backBtn, pressed && styles.buttonPressed]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backBtnText}>← Back</Text>
          </Pressable>
        </View>

        <Text style={styles.name}>{venue.name}</Text>
        <Text style={styles.category}>{CATEGORY_LABELS[venue.category]}</Text>
        {venue.address ? (
          <Text style={styles.address}>{venue.address}</Text>
        ) : null}

        <View style={[styles.waitCard, { borderLeftColor: statusColor }]}>
          <Text style={styles.waitLabel}>Wait time</Text>
          <Text style={[styles.waitValue, { color: statusColor }]}>{statusLabel}</Text>
          {venue.latest_wait_source && (
            <Text style={styles.waitSource}>
              {venue.latest_wait_source === 'user'
                ? 'User reported'
                : venue.latest_wait_source === 'venue'
                  ? 'Venue reported'
                  : 'Google estimate'}
            </Text>
          )}
          {lastUpdated && (
            <Text style={styles.waitTime}>Updated {lastUpdated}</Text>
          )}
        </View>

        <Text style={styles.openClosed}>{openClosed}</Text>

        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
          onPress={handleUpdateWaitTime}
        >
          <Text style={styles.primaryButtonText}>Update Wait Time</Text>
        </Pressable>

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [styles.actionButton, pressed && styles.buttonPressed]}
            onPress={openDirections}
          >
            <Text style={styles.actionButtonText}>Directions</Text>
          </Pressable>
          {venue.phone ? (
            <Pressable
              style={({ pressed }) => [styles.actionButton, pressed && styles.buttonPressed]}
              onPress={openPhone}
            >
              <Text style={styles.actionButtonText}>Call</Text>
            </Pressable>
          ) : null}
          {venue.website ? (
            <Pressable
              style={({ pressed }) => [styles.actionButton, pressed && styles.buttonPressed]}
              onPress={openWebsite}
            >
              <Text style={styles.actionButtonText}>Website</Text>
            </Pressable>
          ) : null}
        </View>

        <Pressable
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
          onPress={handleClaimVenue}
        >
          <Text style={styles.secondaryButtonText}>Claim This Venue</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scroll: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 16,
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 0,
    minHeight: MIN_BUTTON_HEIGHT,
    justifyContent: 'center',
  },
  backBtnText: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  },
  errorText: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.error,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.foreground,
    marginBottom: 4,
  },
  category: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
    marginBottom: 8,
  },
  address: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.foreground,
    marginBottom: 24,
  },
  waitCard: {
    backgroundColor: theme.colors.input,
    borderRadius: theme.radius.md,
    padding: 20,
    borderLeftWidth: 4,
    marginBottom: 16,
  },
  waitLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
    marginBottom: 4,
  },
  waitValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  waitSource: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  },
  waitTime: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.border,
    marginTop: 4,
  },
  openClosed: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.success,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    minHeight: MIN_BUTTON_HEIGHT,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: theme.fontSizes.base,
    fontWeight: '600',
    color: theme.colors.foreground,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.input,
    minHeight: MIN_BUTTON_HEIGHT,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actionButtonText: {
    fontSize: theme.fontSizes.sm,
    fontWeight: '600',
    color: theme.colors.foreground,
  },
  secondaryButton: {
    minHeight: MIN_BUTTON_HEIGHT,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  secondaryButtonText: {
    fontSize: theme.fontSizes.base,
    fontWeight: '600',
    color: theme.colors.primary,
  },
});
