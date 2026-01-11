import { getPreviewClient, LiveQueryProvider, usePreview } from 'lib/sanity.preview'
import { pagesBySlugQuery } from 'lib/sanity.queries'
import type { PagePayload } from 'types'

import { Page, PageProps } from './Page'

function PagePreviewContent({
  token,
  page,
  settings,
  homePageTitle,
}: {
  token: null | string
} & PageProps) {
  const pagePreview: PagePayload = usePreview(token, pagesBySlugQuery, {
    slug: page?.slug,
    initialData: page,
  })

  return (
    <Page
      page={pagePreview}
      settings={settings}
      homePageTitle={homePageTitle}
      preview={true}
    />
  )
}

export default function PagePreview(props: {
  token: null | string
} & PageProps) {
  const client = getPreviewClient(props.token || '')

  return (
    <LiveQueryProvider client={client}>
      <PagePreviewContent {...props} />
    </LiveQueryProvider>
  )
}
