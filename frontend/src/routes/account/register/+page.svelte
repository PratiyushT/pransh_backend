<script lang="ts">
import { signUp } from '$lib/supabase/auth'

let email = ''
let password = ''
let loading = false
let errorMessage = ''

async function handleSignup() {
  loading = true
  const { error } = await signUp(email, password)
  loading = false

  if (error) {
    errorMessage = error.message
  } else {
    alert('Check your email for verification link')
  }
}
</script>

<input bind:value={email} placeholder="Email" />
<input bind:value={password} type="password" placeholder="Password" />
<button on:click={handleSignup} disabled={loading}>
  {loading ? 'Loading...' : 'Sign Up'}
</button>

{#if errorMessage}
  <p>{errorMessage}</p>
{/if}
