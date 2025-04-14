<script lang="ts">
import { supabase } from '$lib/supabase/client'
import { getProfile, signOut } from '$lib/supabase/auth'

let user
let profile
let loading = true

// Get logged in user from Supabase Auth
supabase.auth.getUser().then(async ({ data }) => {
  user = data.user

  if (user) {
    const { data: profileData } = await getProfile(user.id)
    profile = profileData
  }

  loading = false
})

// Handle logout button click
async function handleLogout() {
  await signOut()
  location.href = '/'
}
</script>

{#if loading}
  <p>Loading...</p>
{:else if !user}
  <p>You are not logged in.</p>
{:else}
  <h1>Welcome {profile?.full_name || user.email}</h1>
  <button on:click={handleLogout}>Logout</button>
{/if}
