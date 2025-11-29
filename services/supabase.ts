
import { createClient } from '@supabase/supabase-js';

// Helper to safely get environment variables without crashing in browser
const getEnv = (key: string, fallback: string = ''): string => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key] || fallback;
    }
  } catch (e) {
    // process is not defined
  }
  return fallback;
};

// Configuration as requested
const supabaseUrl = 'https://qnxyyyhwdsxcqxeplgpc.supabase.co';
const supabaseKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'placeholder');

if (supabaseKey === 'placeholder') {
  console.warn("⚠️ SUPABASE_KEY is missing! Auth will not work. Check README.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
};
