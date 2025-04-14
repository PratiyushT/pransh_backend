
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

// Import Edge function helpers from Supabase
import { serve } from 'https://deno.land/x/sift@0.6.0/mod.ts'

// Main handler function
serve(async (req) => {
  // Parse the incoming request body (sent by Supabase automatically)
  const { record } = await req.json()

  // record contains user info: id, email, etc.
  const user_id = record.id
  const user_email = record.email

  // Connect to Supabase with Service Role Key (Backend only - very powerful key)
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

  // Create Supabase client
  const { createClient } = await import('https://esm.sh/@supabase/supabase-js')
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

  // Insert into profiles table
  const { error } = await supabase.from('profiles').insert({
    id: user_id,
    email: user_email
  })

  if (error) {
    console.error('Error inserting profile:', error)
    return new Response('Error creating profile', { status: 400 })
  }

  return new Response('Profile created successfully', { status: 200 })
})
