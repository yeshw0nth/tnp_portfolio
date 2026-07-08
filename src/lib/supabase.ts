import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cdthxbgltmqbpcvpbbsw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkdGh4YmdsdG1xYnBjdnBiYnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MzU3NzAsImV4cCI6MjA5OTAxMTc3MH0.17IIqY5vdBaplmUa98oMewG3SgkkGA41kYHAQEt6wws';

if (!supabaseUrl || !supabaseKey) {
  console.warn('🚨 SUPABASE KEY MISSING: Check .env.local and restart server');
} else {
  console.log('✅ Supabase Key Loaded');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
