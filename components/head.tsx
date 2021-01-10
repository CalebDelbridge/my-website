import Head from "next/head"
import { ReactElement, useState, useEffect } from "react"

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
  const [metaData, setMetaData] = useState(null)
  useEffect(() => {
    setMetaData({ image, url, title, description })
  }, [image, url, title, description])
  return (
    <Head>
      <title>{metaData?.title}</title>
      <meta property="twitter:title" content={metaData?.title} />
      <meta name="title" content={metaData?.title} />
      <meta property="og:title" content={metaData?.title} />
      <meta property="og:description" content={metaData?.description} />
      <meta property="twitter:description" content={metaData?.description} />
      <meta name="description" content={metaData?.description} />
      <meta property="og:image" content={metaData?.image} />
      <meta property="twitter:card" content={metaData?.image} />
      <meta property="twitter:image" content={metaData?.image} />
      <meta property="og:url" content={metaData?.url} />
      <meta property="twitter:url" content={metaData?.url} />
      <meta property="og:type" content="website" />
    </Head>
  )
}

export default Index
