import Head from "../components/head"
import React, { ReactElement } from "react"

const Index = (): ReactElement => {
  return (
    <div className="m-0 h-full overflow-hidden">
      <Head
        title="Terms & Conditions"
        description="A completed terms and conditions form completed by the client is required in order to start a project"
        url={process.env.NEXT_PUBLIC_META_URL}
        image={process.env.NEXT_PUBLIC_META_IMAGE_PATH}
      />
      <iframe
        title="Typeform Full Embed"
        id="typeform-full"
        width="100%"
        height="100%"
        frameBorder="0"
        src={process.env.NEXT_PUBLIC_TYPEFORM_URL}
        className="absolute inset-0 border-none"
      />
    </div>
  )
}

export default Index
