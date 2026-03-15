import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../hooks/useLocation';
import { useVenues } from '../hooks/useVenues';
import type { RootStackParamList } from '../types/navigation';
import type { VenueCategory } from '../types/venues';
import { CATEGORY_LABELS, DEFAULT_CATEGORY } from '../types/venues';
import { theme } from '../theme';
import { CategoryTabs } from '../components/CategoryTabs';
import { VenueList } from '../components/VenueList';
import { SearchModal } from '../components/SearchModal';
import { LoginSignupModal } from './LoginSignupModal';

const MIN_TAB_HEIGHT = 48;

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: HomeProps) {
  const { session, signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const location = useLocation();
  const [loginVisible, setLoginVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [category, setCategory] = useState<VenueCategory>(DEFAULT_CATEGORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const { venues, loading, error } = useVenues({
    category,
    lat: location.coords?.latitude ?? null,
    lng: location.coords?.longitude ?? null,
    searchQuery,
  });

  useEffect(() => {
    if (location.permission === 'pending' || location.permission === 'denied') {
      location.requestPermission();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- request once on mount when not granted
  }, []);

  const handleUpdateWaitTime = () => {
    if (!session) {
      setLoginVisible(true);
      return;
    }
    // TODO Phase 3: open Update Wait Time bottom sheet
  };

  const handleVenuePress = (venue: { id: string }) => {
    navigation.navigate('VenueDetail', { venueId: venue.id });
  };

  const sectionTitle = `Nearby ${CATEGORY_LABELS[category]}`;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.locationRow}>
          <Text style={styles.pin}>📍</Text>
          <Text style={styles.location} numberOfLines={1}>
            {location.label || 'Location'}
          </Text>
          <Pressable
            onPress={() => setSearchVisible(true)}
            style={styles.searchIcon}
            accessibilityLabel="Search venues"
          >
            <Text style={styles.searchIconText}>🔍</Text>
          </Pressable>
        </View>
        <View style={styles.filtersRow}>
          <View style={styles.categoriesWrap}>
            <CategoryTabs selected={category} onSelect={setCategory} useHomeColors />
          </View>
          <View style={styles.viewToggle}>
            <Pressable
              style={[styles.toggleBtn, viewMode === 'list' && styles.toggleBtnActive]}
              onPress={() => setViewMode('list')}
            >
              <Text style={[styles.toggleText, viewMode === 'list' && styles.toggleTextActive]}>
                List
              </Text>
            </Pressable>
            <Pressable
              style={[styles.toggleBtn, viewMode === 'map' && styles.toggleBtnActive]}
              onPress={() => setViewMode('map')}
            >
              <Text style={[styles.toggleText, viewMode === 'map' && styles.toggleTextActive]}>
                Map
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.listContainer}>
        {viewMode === 'list' ? (
          <VenueList
            venues={venues}
            loading={loading}
            error={error}
            userLat={location.coords?.latitude ?? null}
            userLng={location.coords?.longitude ?? null}
            onVenuePress={handleVenuePress}
            light
            sectionTitle={sectionTitle}
          />
        ) : (
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>Map view</Text>
            <Text style={styles.mapPlaceholderHint}>
              Add EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN to .env to enable
            </Text>
          </View>
        )}
      </View>

      <View style={styles.bottomNav}>
        <Pressable style={[styles.navItem, styles.navItemActive]}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>HOME</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => setSearchVisible(true)}>
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navLabel}>SEARCH</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => setViewMode('map')}>
          <Text style={styles.navIcon}>🗺️</Text>
          <Text style={styles.navLabel}>MAP</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>PROFILE</Text>
        </Pressable>
      </View>

      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        venues={venues}
        userLat={location.coords?.latitude ?? null}
        userLng={location.coords?.longitude ?? null}
        onVenueSelect={(venue) => handleVenuePress(venue)}
      />
      <LoginSignupModal
        visible={loginVisible}
        onClose={() => setLoginVisible(false)}
        onSignIn={signInWithEmail}
        onSignUp={signUpWithEmail}
        onGoogle={signInWithGoogle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.homeBackground,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.homeTabInactive,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pin: {
    fontSize: 16,
    marginRight: 6,
  },
  location: {
    flex: 1,
    fontSize: theme.fontSizes.lg,
    fontWeight: '600',
    color: theme.colors.homeText,
  },
  searchIcon: {
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIconText: {
    fontSize: 18,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoriesWrap: {
    flex: 1,
    marginRight: 8,
  },
  viewToggle: {
    flexDirection: 'row',
    gap: 4,
  },
  toggleBtn: {
    paddingHorizontal: 14,
    minHeight: 36,
    justifyContent: 'center',
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.homeTabInactive,
  },
  toggleBtnActive: {
    backgroundColor: theme.colors.homeAccent,
  },
  toggleText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.homeText,
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  mapPlaceholderText: {
    fontSize: theme.fontSizes.lg,
    color: theme.colors.homeTextSecondary,
    marginBottom: 8,
  },
  mapPlaceholderHint: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.homeTabInactive,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: theme.colors.homeTabInactive,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 8,
    minHeight: MIN_TAB_HEIGHT + 32,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 20,
  },
  navItemActive: {
    backgroundColor: theme.colors.homeAccent,
  },
  navIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.homeTextSecondary,
  },
  navLabelActive: {
    color: '#FFFFFF',
  },
});
