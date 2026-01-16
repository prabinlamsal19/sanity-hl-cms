import { ProjectPayload, SettingsPayload, ShowcaseContent } from 'types'
import { Suspense, lazy } from 'react'
import {
  getHomePageTitle,
  getProjectBySlug,
  getProjectPaths,
  getProjects,
  getSettings,
} from 'lib/sanity.client'

import { GetStaticProps } from 'next'
import { PreviewWrapper } from 'components/preview/PreviewWrapper'
import ProjectPage from 'components/pages/project/ProjectPage'
import { resolveHref } from 'lib/sanity.links'

const ProjectPreview = lazy(
  () => import('components/pages/project/ProjectPreview')
)

interface PageProps {
  project: ProjectPayload
  projects: ShowcaseContent[]
  settings?: SettingsPayload
  homePageTitle?: string
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { project, projects, settings, homePageTitle, preview, token } = props

  if (preview) {
    return (
      <Suspense
        fallback={
          <PreviewWrapper>
            <ProjectPage
              project={project}
              projects={projects}
              settings={settings}
              homePageTitle={homePageTitle}
              preview={preview}
            />
          </PreviewWrapper>
        }
      >
        <ProjectPreview
          token={token}
          project={project}
          projects={projects}
          settings={settings}
          homePageTitle={homePageTitle}
        />
      </Suspense>
    )
  }

  return (
    <ProjectPage
      project={project}
      projects={projects}
      settings={settings}
      homePageTitle={homePageTitle}
      preview={preview}
    />
  )
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx

  const token = previewData.token

  const [project, projects = [], settings, homePageTitle] = await Promise.all([
    getProjectBySlug({ token, slug: params.slug }),
    getProjects({ token }),
    getSettings({ token }),
    getHomePageTitle({ token }),
  ])

  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project,
      projects,
      settings,
      homePageTitle,
      preview,
      token: previewData.token ?? null,
    },
    revalidate: 1,
  }
}

export const getStaticPaths = async () => {
  const paths = await getProjectPaths()

  return {
    paths: paths?.map((slug) => resolveHref('project', slug)) || [],
    fallback: 'blocking',
  }
}
