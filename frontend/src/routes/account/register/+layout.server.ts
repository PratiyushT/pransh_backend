// This runs on server before loading any /account/* page
import { redirect } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'

// This function will run before any /account page is loaded
export const load = async () => {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )

  const { data: { user } } = await supabase.auth.getUser()

  // If user is not logged in → Redirect to /account/login
  if (!user) {
    console.log('No user found')
  }

  return { user }
}
