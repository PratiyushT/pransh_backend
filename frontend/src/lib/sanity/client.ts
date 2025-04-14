import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // from .env.example
  dataset: import.meta.env.VITE_SANITY_DATASET,     // from .env.example
  apiVersion: '2023-01-01',
  useCdn: true
})

