import { AppProps } from "next/app"
import "../styles/global.scss"

export default function MyApp({ Component, pageProps }: AppProps): unknown {
  return <Component {...pageProps} />
}
