import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import type { RootStackParamList } from '../types/navigation';
import { theme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export function ProfileScreen({ navigation }: Props) {
  const { session, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          accessibilityLabel="Go back"
        >
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.content}>
        {session?.user?.email ? (
          <>
            <Text style={styles.label}>Signed in as</Text>
            <Text style={styles.email}>{session.user.email}</Text>
            <Pressable onPress={() => signOut()} style={styles.button}>
              <Text style={styles.buttonText}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.label}>You're not signed in.</Text>
            <Text style={styles.hint}>Sign in from Home when you update a wait time.</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.homeBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.homeTabInactive,
  },
  backBtn: {
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
  },
  backText: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.homeAccent,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    fontSize: theme.fontSizes.lg,
    fontWeight: '700',
    color: theme.colors.homeText,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.homeTextSecondary,
    marginBottom: 8,
  },
  email: {
    fontSize: theme.fontSizes.lg,
    fontWeight: '600',
    color: theme.colors.homeText,
    marginBottom: 24,
  },
  hint: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.homeTextSecondary,
  },
  button: {
    backgroundColor: theme.colors.homeAccent,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: theme.radius.md,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: theme.fontSizes.base,
  },
});
