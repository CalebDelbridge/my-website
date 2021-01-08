import Head from "next/head"
import { ReactElement, createContext, useContext } from "react"

const MetaData = createContext<{
  image: string
  url: string
  title: string
  description: string
} | null>(null)

const MetaDescription = (): ReactElement => {
  const metaData = useContext(MetaData)
  return (
    <>
      <meta property="og:description" content={metaData?.description} />
      <meta property="twitter:description" content={metaData?.description} />
      <meta name="description" content={metaData?.description} />
    </>
  )
}

const MetaTitle = (): ReactElement => {
  const metaData = useContext(MetaData)
  return (
    <>
      <meta property="twitter:title" content={metaData?.title} />
      <title>{metaData?.title}</title>
      <meta name="title" content={metaData?.title} />
      <meta property="og:title" content={metaData?.title} />
    </>
  )
}

const MetaURL = (): ReactElement => {
  const metaData = useContext(MetaData)
  return (
    <>
      <meta property="og:url" content={metaData?.url} />
      <meta property="twitter:url" content={metaData?.url} />
    </>
  )
}

const MetaImage = (): ReactElement => {
  const metaData = useContext(MetaData)
  return (
    <>
      <meta property="og:image" content={metaData?.image} />
      <meta property="twitter:card" content={metaData?.image} />
      <meta property="twitter:image" content={metaData?.image} />
    </>
  )
}

const Index = ({
  image,
  url,
  title,
  description,
}: {
  image: string
  url: string
  title: string
  description: string
}): ReactElement => {
  return (
    <MetaData.Provider value={{ image, url, title, description }}>
      <Head>
        <MetaImage />
        <MetaURL />
        <MetaTitle />
        <MetaDescription />
        <meta property="og:type" content="website" />
      </Head>
    </MetaData.Provider>
  )
}

export default Index
