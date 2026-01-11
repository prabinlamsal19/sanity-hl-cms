import { getPreviewClient, LiveQueryProvider, usePreview } from 'lib/sanity.preview'
import { homePageQuery } from 'lib/sanity.queries'
import type { HomePagePayload } from 'types'

import { HomePage, HomePageProps } from './HomePage'

function HomePagePreviewContent({
  token,
  page,
  settings,
}: { token: null | string } & HomePageProps) {
  const home: HomePagePayload = usePreview(token, homePageQuery, {
    initialData: page,
  })

  if (!home) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    )
  }

  return <HomePage page={home} settings={settings} preview={true} />
}

export default function HomePagePreview(props: { token: null | string } & HomePageProps) {
  const client = getPreviewClient(props.token || '')

  return (
    <LiveQueryProvider client={client}>
      <HomePagePreviewContent {...props} />
    </LiveQueryProvider>
  )
}
