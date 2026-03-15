import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { registerRootComponent } from 'expo';

import App from './App';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorText}>{this.state.error.message}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0f0f12',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fafafa',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#a1a1aa',
    textAlign: 'center',
  },
});

registerRootComponent(() => (
  <ErrorBoundary>
    <View style={{ flex: 1, backgroundColor: '#D3543C' }}>
      <App />
    </View>
  </ErrorBoundary>
));
