import { getPreviewClient, LiveQueryProvider, usePreview } from 'lib/sanity.preview'
import { projectBySlugQuery } from 'lib/sanity.queries'
import type { ProjectPayload } from 'types'

import ProjectPage from './ProjectPage'
import { ProjectPageProps } from './ProjectPage'

function ProjectPreviewContent({
  token,
  project,
  projects,
  settings,
  homePageTitle,
}: {
  token: null | string
} & ProjectPageProps) {
  const projectPreview: ProjectPayload = usePreview(token, projectBySlugQuery, {
    slug: project?.slug,
    initialData: project,
  })

  return (
    <ProjectPage
      project={projectPreview}
      projects={projects}
      settings={settings}
      homePageTitle={homePageTitle}
      preview={true}
    />
  )
}

export default function ProjectPreview(props: {
  token: null | string
} & ProjectPageProps) {
  const client = getPreviewClient(props.token || '')

  return (
    <LiveQueryProvider client={client}>
      <ProjectPreviewContent {...props} />
    </LiveQueryProvider>
  )
}
