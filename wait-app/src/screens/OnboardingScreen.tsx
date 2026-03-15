import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';

const SLIDES = [
  {
    title: 'Real-Time Wait Times',
    body: 'See how busy venues are before you go. No more wasted trips.',
  },
  {
    title: 'Community Powered',
    body: 'Help others by sharing wait times at places you visit. Quick and easy.',
  },
  {
    title: 'Save time',
    body: 'Plan your visit—no more showing up to long lines.',
  },
];

export function OnboardingScreen({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const isLast = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.illustrationBlock} />
      <View style={styles.bottomSection}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.body}>{slide.body}</Text>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => (isLast ? onFinish() : setStep(step + 1))}
        >
          <Text style={styles.buttonText}>
            {isLast ? 'Get started' : 'Next'}
            {!isLast ? ' →' : ''}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  illustrationBlock: {
    flex: 1,
    backgroundColor: theme.colors.onboardingIllustrationBg,
    minHeight: 200,
  },
  bottomSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  body: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.secondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d4d4d4',
  },
  dotActive: {
    backgroundColor: theme.colors.onboardingAccent,
    width: 24,
  },
  button: {
    backgroundColor: theme.colors.onboardingAccent,
    paddingVertical: 16,
    minHeight: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSizes.base,
    fontWeight: '600',
  },
});
