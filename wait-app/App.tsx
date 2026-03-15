import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { VenueDetailScreen } from './src/screens/VenueDetailScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import type { RootStackParamList } from './src/types/navigation';
import { theme } from './src/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SPLASH_DURATION_MS = 2000;
const ONBOARDING_KEY = '@waitapp_onboarding_done';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), SPLASH_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (showSplash) return;
    AsyncStorage.getItem(ONBOARDING_KEY).then((v) => {
      setInitialRoute(v ? 'Home' : 'Onboarding');
    });
  }, [showSplash]);

  const content = showSplash || initialRoute === null ? (
    <SplashScreen />
  ) : (
    <>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: theme.colors.background },
            }}
          >
            <Stack.Screen name="Onboarding" component={OnboardingWrapper} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="VenueDetail" component={VenueDetailScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.splashGradientEnd }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics ?? undefined}>
        <StatusBar style="light" />
        {content}
      </SafeAreaProvider>
    </View>
  );
}

function OnboardingWrapper({ navigation }: NativeStackScreenProps<RootStackParamList, 'Onboarding'>) {
  const onFinish = () => {
    AsyncStorage.setItem(ONBOARDING_KEY, '1').then(() => navigation.replace('Home'));
  };
  return <OnboardingScreen onFinish={onFinish} />;
}
