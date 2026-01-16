import { StudioLayout, StudioProvider } from 'sanity'

import Head from 'next/head'
import { NextStudio } from 'next-sanity/studio'
import config from 'sanity.config'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle(({ theme }) => ({
  //TODO: put the base bg
  html: { backgroundColor: "white" },
}))

export default function StudioPage() {
  //TODO: put beteter HEAD for seo (sanity wala head)
  return (
    <>
      {/* <Head>
      </Head> */}

      <NextStudio config={config}>
        <StudioProvider config={config}>
          <GlobalStyle />
          <StudioLayout />
        </StudioProvider>
      </NextStudio>
    </>
  )
}
