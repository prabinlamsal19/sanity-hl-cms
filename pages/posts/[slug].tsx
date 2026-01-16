import { PostPayload, SettingsPayload, ShowcaseContent } from 'types'
import { Suspense, lazy } from 'react'
import {
  getHomePageTitle,
  getPostBySlug,
  getPostPaths,
  getPosts,
  getSettings,
} from 'lib/sanity.client'

import { GetStaticProps } from 'next'
import PostPage from 'components/pages/post/PostPage'
import { resolveHref } from 'lib/sanity.links'

const PreviewPostPage = lazy(() => import('components/pages/post/PostPreview'))

interface PageProps {
  post: PostPayload
  posts: ShowcaseContent[]
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
  const { post, posts, settings, homePageTitle, preview, token } = props

  if (preview) {
    return (
      <Suspense
        fallback={
          <PostPage
            post={post}
            posts={posts}
            settings={settings}
            homePageTitle={homePageTitle}
            preview={preview}
          />
        }
      >
        <PreviewPostPage
          token={token}
          post={post}
          posts={posts}
          settings={settings}
          homePageTitle={homePageTitle}
        />
      </Suspense>
    )
  }

  return (
    <PostPage
      post={post}
      posts={posts}
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

  const [post, posts = [], settings, homePageTitle] = await Promise.all([
    getPostBySlug({ token, slug: params.slug }),
    getPosts({ token }),
    getSettings({ token }),
    getHomePageTitle({ token }),
  ])

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      posts,
      settings,
      homePageTitle,
      preview,
      token: previewData.token ?? null,
    },
    revalidate: 1,
  }
}

export const getStaticPaths = async () => {
  const paths = await getPostPaths()

  return {
    paths: paths?.map((slug) => resolveHref('post', slug)) || [],
    fallback: 'blocking',
  }
}
