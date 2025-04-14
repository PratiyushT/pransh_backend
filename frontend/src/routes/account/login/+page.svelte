<script lang="ts">
// Import login function from auth helper
import { signIn } from '$lib/supabase/auth'

let email = ''
let password = ''
let loading = false
let errorMessage = ''

// Handle login button click
async function handleLogin() {
  loading = true
  const { error } = await signIn(email, password)
  loading = false

  if (error) {
    errorMessage = error.message
  } else {
    // Redirect to account page after login
    location.href = '/account'
  }
}
</script>

<h1>Login</h1>
<input bind:value={email} placeholder="Email" />
<input bind:value={password} type="password" placeholder="Password" />
<button on:click={handleLogin} disabled={loading}>
  {loading ? 'Logging in...' : 'Login'}
</button>

{#if errorMessage}
  <p>{errorMessage}</p>
{/if}
