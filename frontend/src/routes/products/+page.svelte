<script lang="ts">
  // Algorithm:
  // 1. Get data from server load function
  // 2. Show categories above products
  // 3. Render each product
  // 4. Show Previous/Next buttons for pagination

  export let data;

  let products = data.products || [];  // Step 1
  let categories = data.categories || [];
  let page = data.page || 1;
  let totalPages = data.totalPages || 1;
</script>

<h1 class="text-2xl font-bold mb-6">All Products</h1>

<!-- Step 2 - Show Categories -->
<div class="mb-6">
  <h2 class="font-semibold text-lg mb-2">Categories:</h2>
  <ul class="flex gap-4 flex-wrap">
    {#each categories as category}
      <li class="px-3 py-1 bg-gray-200 rounded">{category.name}</li>
    {/each}
  </ul>
</div>

<!-- Step 3 - Show Products -->
{#if products.length > 0}
  {#each products as product}
    <div class="border p-4 mb-4 rounded shadow-sm">
      <h2 class="text-xl font-bold">{product.name}</h2>
      <p class="mt-1">{product.description}</p>
      <p class="text-sm text-gray-500 mt-1">Category: {product.category}</p>
      <p class="text-sm text-gray-500">Rating: {product.rating}</p>
    </div>
  {/each}
{:else}
  <p>No products found.</p>
{/if}

<!-- Step 4 - Pagination Controls -->
<div class="flex items-center gap-4 mt-8">
  {#if page > 1}
    <a href="?page={page - 1}" class="underline">Previous</a>
  {/if}

  <span>Page {page} of {totalPages}</span>

  {#if page < totalPages}
    <a href="?page={page + 1}" class="underline">Next</a>
  {/if}
</div>
