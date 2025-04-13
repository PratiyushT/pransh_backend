<script lang="ts">
import { stripePromise } from '$lib/stripe/client'


const cartItems = [
  {
    id: 'fefce337-a313-4032-8782-334e0e230b70', // Product _id from Sanity
    sku: 'test1',                                // Variant SKU
    name: 'Data 1 - Blue / L',                  // Readable variant name
    price: 12.99,                                // From Sanity variant price
    quantity: 2                                  // User selected quantity
  },
  {
    id: 'fefce337-a313-4032-8782-334e0e230b70', // Same Product ID (different variant)
    sku: 'test2',                                // Variant SKU
    name: 'Data 1 - Red / M',                   // Readable variant name
    price: 22.9,                                 // From Sanity variant price
    quantity: 1                                  // User selected quantity
  }
]

async function handleCheckout() {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify({
      items: cartItems,
      origin: window.location.origin
    })
  })

  const { sessionId, error } = await res.json()

  if (error) {
    console.error(error)
    return
  }

  const stripe = await stripePromise
  stripe?.redirectToCheckout({ sessionId })
}
</script>

<button on:click={handleCheckout}>
  Checkout
</button>
