import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';

const MIN_BUTTON_HEIGHT = 48;

type Props = {
  visible: boolean;
  onClose: () => void;
  onSignIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  onSignUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  onGoogle: () => Promise<{ error: Error | null }>;
};

export function LoginSignupModal({ visible, onClose, onSignIn, onSignUp, onGoogle }: Props) {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setEmail('');
      setPassword('');
      setError('');
    }
  }, [visible]);

  const handleModeToggle = () => {
    setMode((m) => (m === 'signin' ? 'signup' : 'signin'));
    setError('');
  };

  const handleSubmit = async () => {
    setError('');
    if (!email.trim()) {
      setError('Enter your email');
      return;
    }
    if (!password) {
      setError('Enter your password');
      return;
    }
    setLoading(true);
    try {
      const fn = mode === 'signin' ? onSignIn : onSignUp;
      const { error: err } = await fn(email.trim(), password);
      if (err) {
        setError(err.message ?? 'Something went wrong');
        return;
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      const { error: err } = await onGoogle();
      if (err) {
        setError(err.message ?? 'Google sign-in not configured yet. Add Client ID in Supabase.');
        return;
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.overlay, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{mode === 'signin' ? 'Sign in' : 'Sign up'}</Text>
            <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={12}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.secondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={theme.colors.secondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
              { minHeight: MIN_BUTTON_HEIGHT },
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.foreground} />
            ) : (
              <Text style={styles.primaryButtonText}>
                {mode === 'signin' ? 'Sign in' : 'Create account'}
              </Text>
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
            onPress={handleModeToggle}
          >
            <Text style={styles.secondaryButtonText}>
              {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </Text>
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.googleButton,
              pressed && styles.buttonPressed,
              { minHeight: MIN_BUTTON_HEIGHT },
            ]}
            onPress={handleGoogle}
            disabled={loading}
          >
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </Pressable>
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
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: 24,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
    padding: 8,
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
    marginBottom: 12,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSizes.sm,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginBottom: 12,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  primaryButtonText: {
    color: theme.colors.foreground,
    fontSize: theme.fontSizes.base,
    fontWeight: '600',
  },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    paddingVertical: 12,
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    marginHorizontal: 12,
    color: theme.colors.secondary,
    fontSize: theme.fontSizes.sm,
  },
  googleButton: {
    backgroundColor: theme.colors.input,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  googleButtonText: {
    color: theme.colors.foreground,
    fontSize: theme.fontSizes.base,
    fontWeight: '500',
  },
});
