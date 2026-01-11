import { ContentSection } from './ContentSection'
import type { HomePagePayload } from 'types'
import { LandingSection } from './LandingSection'
import Layout from 'components/shared/Layout'
import { SettingsPayload } from 'types'
import { ShowcaseSection } from './ShowcaseSection'
import { SiteMeta } from 'components/global/SiteMeta'

export interface HomePageProps {
  settings?: SettingsPayload
  page?: HomePagePayload
  preview?: boolean
}

export function HomePage({ page, settings, preview }: HomePageProps) {
  const { title, landingSection, contentSection, showcaseSection } = page ?? {}

  return (
    <>
      <SiteMeta
        description={landingSection?.subtitle}
        image={settings?.ogImage}
        title={title}
      />

      <Layout settings={settings} preview={preview}>
        <div className="mx-auto max-w-7xl">
          <LandingSection title={title ?? ''} landingSection={landingSection ?? {
            subtitle: '',
            aboutMeButton: 'About Me',
          }} />
          <ContentSection contentSection={contentSection ?? {
            showcaseContent: [],
            readMoreButton: 'Read More',
          }} />
          <ShowcaseSection showcaseSection={showcaseSection ?? {
            title: '',
            subtitle: '',
            showcaseContent: {
              _type: '',
              slug: '',
              title: '',
            },
            learnMoreButton: 'Learn More',
            showcaseImage: {},
          }} />
        </div>
      </Layout>
    </>
  )
}
