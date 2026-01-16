import { LiveQueryProvider, useLiveQuery } from '@sanity/preview-kit'
import { createClient, type SanityClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from 'lib/sanity.api'

// Create a client for preview mode with token
export function getPreviewClient(token: string): SanityClient {
  return createClient({
    projectId: projectId || '',
    dataset: dataset || '',
    apiVersion: apiVersion,
    useCdn: false,
    token,
    perspective: 'previewDrafts',
  })
}

// Custom hook that wraps useLiveQuery for easier migration
// Note: This must be used within a LiveQueryProvider context
export function usePreview<T = any>(
  token: string | null,
  query: string,
  params?: Record<string, any>
): T {
  // useLiveQuery expects: initialData, query, params
  const [data] = useLiveQuery<T>(params?.initialData ?? null, query, params)
  return data
}

// Export LiveQueryProvider for use in preview pages
export { LiveQueryProvider }
