import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';

export function SplashScreen() {
  return (
    <SafeAreaView style={styles.wrapper} edges={['top', 'bottom']}>
      <View style={[styles.gradient, { backgroundColor: theme.colors.splashGradientEnd }]}>
        <LinearGradient
          colors={[theme.colors.splashGradientStart, theme.colors.splashGradientEnd]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.content} pointerEvents="box-none">
          <View style={styles.logoCircle}>
            <Text style={styles.logoLetter}>W</Text>
          </View>
          <Text style={styles.appName}>Wait</Text>
          <Text style={styles.tagline}>Skip the wait, not the experience</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.splashGradientEnd,
  },
  gradient: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: theme.colors.splashLogoCircle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoLetter: {
    fontSize: 44,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  appName: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: theme.fontSizes.base,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
