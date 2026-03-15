import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import type { VenueCategory } from '../types/venues';
import { CATEGORY_LABELS, VENUE_CATEGORIES } from '../types/venues';
import { theme } from '../theme';

const MIN_TAB_HEIGHT = 44;

type Props = {
  selected: VenueCategory;
  onSelect: (category: VenueCategory) => void;
  /** Use coral/light style for Home list design. */
  useHomeColors?: boolean;
};

export function CategoryTabs({ selected, onSelect, useHomeColors }: Props) {
  const tabActiveStyle = useHomeColors ? styles.tabActiveHome : styles.tabActive;
  const tabTextActiveStyle = useHomeColors ? styles.tabTextActiveHome : styles.tabTextActive;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scroll}
    >
      {VENUE_CATEGORIES.map((cat) => (
        <Pressable
          key={cat}
          style={({ pressed }) => [
            styles.tab,
            useHomeColors && styles.tabHome,
            selected === cat && tabActiveStyle,
            pressed && styles.tabPressed,
          ]}
          onPress={() => onSelect(cat)}
        >
          <Text
            style={[
              styles.tabText,
              useHomeColors && styles.tabTextHome,
              selected === cat && tabTextActiveStyle,
            ]}
            numberOfLines={1}
          >
            {CATEGORY_LABELS[cat]}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { maxHeight: MIN_TAB_HEIGHT + 16 },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    minHeight: MIN_TAB_HEIGHT,
    justifyContent: 'center',
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.input,
  },
  tabHome: {
    backgroundColor: theme.colors.homeTabInactive,
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
  },
  tabActiveHome: {
    backgroundColor: theme.colors.homeAccent,
  },
  tabPressed: {
    opacity: 0.9,
  },
  tabText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.foreground,
    fontWeight: '500',
  },
  tabTextHome: {
    color: theme.colors.homeText,
  },
  tabTextActive: {
    color: theme.colors.foreground,
    fontWeight: '600',
  },
  tabTextActiveHome: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
