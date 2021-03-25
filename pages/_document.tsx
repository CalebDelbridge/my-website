import Document, { Html, Head, Main, NextScript } from "next/document"
import { ReactElement } from "react"

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600;700&display=swap" />
          <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
        </Head>
        <body className="h-screen bg-white dark:bg-slate">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
