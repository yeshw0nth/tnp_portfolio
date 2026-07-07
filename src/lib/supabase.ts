import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('🚨 SUPABASE KEY MISSING: Check .env.local and restart server');
} else {
  console.log('✅ Supabase Key Loaded');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
