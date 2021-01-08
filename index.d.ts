import { Document as PrismicDocument } from "prismic-javascript/types/documents"
declare module "feather-icons"

interface Document extends PrismicDocument {
  data: PrismicData
}

interface PrismicData {
  title: PrismicRichText[]
  description: PrismicRichText[]
  badges: PrismicBadge[]
  icons: PrismicIcon[]
}

interface PrismicIcon {
  type: ProjectIcon
  link: PrismicLink
}

interface PrismicBadge {
  content: PrismicRichText[]
  link: PrismicLink
}

interface PrismicLink {
  link_type: string
  url: string
}

interface PrismicRichText {
  type: string
  text: string
  spans: unknown[]
}

type ProjectIcon = "code" | "help" | "website" | "link"
