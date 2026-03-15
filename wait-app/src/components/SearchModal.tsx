import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Venue } from '../types/venues';
import { haversineKm } from '../lib/geo';
import { VenueCard } from './VenueCard';
import { theme } from '../theme';

const DEBOUNCE_MS = 300;
const MIN_BUTTON_HEIGHT = 48;

type Props = {
  visible: boolean;
  onClose: () => void;
  venues: Venue[];
  userLat: number | null;
  userLng: number | null;
  onVenueSelect: (venue: Venue) => void;
};

export function SearchModal({
  visible,
  onClose,
  venues,
  userLat,
  userLng,
  onVenueSelect,
}: Props) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setDebouncedQuery(query.trim()), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query, visible]);

  const filtered = useCallback(() => {
    if (!debouncedQuery) return venues;
    const q = debouncedQuery.toLowerCase();
    return venues.filter((v) => v.name.toLowerCase().includes(q));
  }, [venues, debouncedQuery]);

  const results = filtered();

  const handleSelect = (venue: Venue) => {
    onVenueSelect(venue);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.overlay, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Search venues</Text>
            <Pressable
              onPress={onClose}
              style={styles.closeBtn}
              hitSlop={12}
            >
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Venue name…"
            placeholderTextColor={theme.colors.secondary}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              query.trim() ? (
                <Text style={styles.empty}>No venues match "{query}"</Text>
              ) : (
                <Text style={styles.hint}>Type to search</Text>
              )
            }
            renderItem={({ item }) => (
              <VenueCard
                venue={item}
                distanceKm={
                  userLat != null && userLng != null
                    ? haversineKm(userLat, userLng, item.lat, item.lng)
                    : undefined
                }
                onPress={() => handleSelect(item)}
              />
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  card: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: 24,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.foreground,
  },
  closeBtn: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 20,
    color: theme.colors.secondary,
  },
  input: {
    backgroundColor: theme.colors.input,
    borderRadius: theme.radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: theme.fontSizes.base,
    color: theme.colors.foreground,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 24,
  },
  empty: {
    paddingVertical: 24,
    fontSize: theme.fontSizes.base,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
  hint: {
    paddingVertical: 24,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.border,
    textAlign: 'center',
  },
});
