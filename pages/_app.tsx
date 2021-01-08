import "../styles/global.scss"

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: any
  pageProps: unknown
}): unknown {
  return <Component {...pageProps} />
}
