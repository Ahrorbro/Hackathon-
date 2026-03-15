import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Wait App: Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY. Add them to wait-app/.env. App will show but auth/venues will not work.');
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
}

const _client = createSupabaseClient();

export const supabase = _client ?? ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: new Error('Configure .env') }),
    signUp: () => Promise.resolve({ data: { user: null, session: null }, error: new Error('Configure .env') }),
    signInWithOAuth: () => Promise.resolve({ data: { provider: '', url: '' }, error: new Error('Configure .env') }),
    signOut: () => Promise.resolve({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => ({ then: (fn: (a: { data: unknown; error: unknown }) => void) => Promise.resolve({ data: [], error: null }).then(fn) }),
        single: () => ({ then: (fn: (a: { data: unknown; error: unknown }) => void) => Promise.resolve({ data: null, error: { message: 'Not configured' } }).then(fn) }),
      }),
    }),
  }),
} as any);
