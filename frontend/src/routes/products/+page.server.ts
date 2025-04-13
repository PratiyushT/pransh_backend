// Algorithm:
// 1. Read the current page number from URL (query params)
// 2. Calculate start and end indexes for pagination
// 3. Fetch paginated products from Sanity between start and end
// 4. Fetch total product count from Sanity
// 5. Fetch all categories from Sanity
// 6. Return all data to be used by +page.svelte

import { sanityClient } from '$lib/sanity/client'
import { paginatedProductsQuery, totalProductCountQuery, allCategoriesQuery } from '$lib/sanity/queries'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page') || 1)

  const perPage = 10  // Items per page
  const start = (page - 1) * perPage  // Step 2
  const end = start + perPage

  const products = await sanityClient.fetch(paginatedProductsQuery(start, end))  // Step 3


  console.log(products);
  const total = await sanityClient.fetch(totalProductCountQuery)  // Step 4
  const categories = await sanityClient.fetch(allCategoriesQuery)  // Step 5

  return {
    products,
    categories,
    page,
    totalPages: Math.ceil(total / perPage)  // Step 6
  }
}
