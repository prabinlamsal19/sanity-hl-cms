import { getPreviewClient, LiveQueryProvider, usePreview } from 'lib/sanity.preview'
import { postBySlugQuery } from 'lib/sanity.queries'
import { PostPayload } from 'types'

import PostPage from './PostPage'
import { PostPageProps } from './PostPage'

function PostPreviewContent({
  token,
  post,
  posts,
  settings,
  homePageTitle,
}: {
  token: null | string
} & PostPageProps) {
  const postPreview: PostPayload = usePreview(token, postBySlugQuery, {
    slug: post?.slug,
    initialData: post,
  })

  return (
    <PostPage
      post={postPreview}
      posts={posts}
      settings={settings}
      homePageTitle={homePageTitle}
      preview={true}
    />
  )
}

export default function PostPreview(props: {
  token: null | string
} & PostPageProps) {
  const client = getPreviewClient(props.token || '')

  return (
    <LiveQueryProvider client={client}>
      <PostPreviewContent {...props} />
    </LiveQueryProvider>
  )
}
