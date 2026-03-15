import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Venue } from '../types/venues';
import { getWaitStatus, WAIT_STATUS_COLORS, WAIT_STATUS_LIST_LABELS } from '../types/venues';
import { theme } from '../theme';

function formatDistance(km: number): string {
  const mi = km * 0.621371;
  if (mi < 0.1) return '< 0.1 mi';
  return `${mi.toFixed(1)} mi`;
}

function formatUpdatedAgo(iso: string | null): string {
  if (!iso) return '';
  const sec = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (sec < 60) return 'Updated just now';
  if (sec < 3600) return `Updated ${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `Updated ${Math.floor(sec / 3600)}h ago`;
  return `Updated ${Math.floor(sec / 86400)}d ago`;
}

type Props = {
  venue: Venue;
  distanceKm?: number;
  onPress: () => void;
  /** Use light card style (Home list design). */
  light?: boolean;
};

export function VenueCard({ venue, distanceKm, onPress, light }: Props) {
  const status = getWaitStatus(venue);
  const color = WAIT_STATUS_COLORS[status];
  const label = WAIT_STATUS_LIST_LABELS[status];
  const updatedAgo = formatUpdatedAgo(venue.latest_wait_at);
  const distanceStr = distanceKm != null ? formatDistance(distanceKm) : '';

  const cardStyle = light ? [styles.card, styles.cardLight] : styles.card;
  const nameStyle = light ? [styles.name, styles.nameLight] : styles.name;
  const detailStyle = light ? [styles.detail, styles.detailLight] : styles.detail;

  return (
    <Pressable
      style={({ pressed }) => [cardStyle, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.row}>
        <Text style={nameStyle} numberOfLines={1}>
          {venue.name}
        </Text>
        <View style={[styles.badge, light ? { backgroundColor: color } : { backgroundColor: color + '22' }]}>
          {!light && <View style={[styles.badgeDot, { backgroundColor: color }]} />}
          <Text style={[styles.badgeText, light && styles.badgeTextLight]}>{label}</Text>
        </View>
      </View>
      {(distanceStr || updatedAgo) ? (
        <Text style={detailStyle}>
          {[distanceStr, updatedAgo].filter(Boolean).join(' ')}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.input,
    borderRadius: theme.radius.md,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardLight: {
    backgroundColor: theme.colors.homeCard,
    borderWidth: 0,
  },
  cardPressed: {
    opacity: 0.9,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: theme.fontSizes.base,
    fontWeight: '600',
    color: theme.colors.foreground,
    flex: 1,
    marginRight: 12,
  },
  nameLight: {
    color: theme.colors.homeText,
  },
  detail: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
    marginTop: 4,
  },
  detailLight: {
    color: theme.colors.homeTextSecondary,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.pill,
    gap: 6,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.foreground,
    fontWeight: '500',
  },
  badgeTextLight: {
    color: '#FFFFFF',
  },
});
