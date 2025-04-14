// This file creates a Supabase client for your frontend

import { createClient } from '@supabase/supabase-js'

// Creating the supabase client using env variables
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
