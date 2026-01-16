import { HomePagePayload, SettingsPayload } from 'types'
import { Suspense, lazy } from 'react'
import { getHomePage, getSettings } from 'lib/sanity.client'

import { GetStaticProps } from 'next'
import { HomePage } from 'components/pages/home/HomePage'
import { PreviewWrapper } from 'components/preview/PreviewWrapper'

const HomePagePreview = lazy(
  () => import('components/pages/home/HomePagePreview')
)

interface PageProps {
  page: HomePagePayload
  settings: SettingsPayload | undefined
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function IndexPage(props: PageProps) {
  const { page, settings, preview, token } = props

  if (preview) {
    return (
      <Suspense
        fallback={
          <PreviewWrapper>
            <HomePage page={page} settings={settings} preview={preview} />
          </PreviewWrapper>
        }
      >
        <HomePagePreview token={token} />
      </Suspense>
    )
  }

  return <HomePage page={page} settings={settings} />
}

const fallbackPage: HomePagePayload = {
  title: '',
  landingSection: {
    subtitle: '',
    aboutMeButton: 'About me',
  },
  contentSection: {
    showcaseContent: [],
    readMoreButton: 'Read more',
  },
  showcaseSection: {
    title: '',
    subtitle: '',
    showcaseContent: {
      _type: 'post',
    },
    learnMoreButton: 'Learn more',
  },
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const token = previewData.token
  /* eslint-disable prefer-const */
  let [settings, page] = await Promise.all([
    getSettings({ token }),
    getHomePage({ token }),
  ])

  if (!page) {
    page = fallbackPage
  }

  return {
    props: {
      page,
      settings: settings ?? null,
      preview,
      token: previewData.token ?? null,
    },
    revalidate: 1,
  }
}
