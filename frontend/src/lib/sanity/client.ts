import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // from .env
  dataset: import.meta.env.VITE_SANITY_DATASET,     // from .env
  apiVersion: '2023-01-01',
  useCdn: true
})

