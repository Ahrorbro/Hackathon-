import React from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../theme';
import type { Venue } from '../types/venues';
import { VenueCard } from './VenueCard';
import { haversineKm } from '../lib/geo';

type Props = {
  venues: Venue[];
  loading: boolean;
  error: string | null;
  userLat: number | null;
  userLng: number | null;
  onVenuePress: (venue: Venue) => void;
  ListEmptyComponent?: React.ReactElement | null;
  /** Light card style + optional section title (e.g. "Nearby Restaurants"). */
  light?: boolean;
  sectionTitle?: string;
};

export function VenueList({
  venues,
  loading,
  error,
  userLat,
  userLng,
  onVenuePress,
  ListEmptyComponent,
  light,
  sectionTitle,
}: Props) {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading venues…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={venues}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[styles.list, light && styles.listLight]}
      ListHeaderComponent={
        sectionTitle ? (
          <Text style={[styles.sectionTitle, light && styles.sectionTitleLight]}>
            {sectionTitle}
          </Text>
        ) : null
      }
      ListEmptyComponent={ListEmptyComponent ?? <EmptyList />}
      renderItem={({ item }) => {
        const distanceKm =
          userLat != null && userLng != null
            ? haversineKm(userLat, userLng, item.lat, item.lng)
            : undefined;
        return (
          <VenueCard
            venue={item}
            distanceKm={distanceKm}
            onPress={() => onVenuePress(item)}
            light={light}
          />
        );
      }}
    />
  );
}

function EmptyList() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>No venues in this category</Text>
      <Text style={styles.emptyHint}>Try another category or search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 24,
  },
  listLight: {
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: '700',
    color: theme.colors.foreground,
    marginBottom: 12,
  },
  sectionTitleLight: {
    color: theme.colors.homeText,
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
  empty: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.secondary,
    marginBottom: 4,
  },
  emptyHint: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.border,
  },
});
