import Prismic from "prismic-javascript"
const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`
const REST_API_URL = `https://${REPOSITORY}.prismic.io/api/v2/documents/search`
export const API_TOKEN = process.env.PRISMIC_API_TOKEN
import { Document } from "prismic-javascript/types/documents"
import ApiSearchResponse from "prismic-javascript/types/ApiSearchResponse"

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
})

async function fetchAPI({
  query,
  extraParams = [],
}: {
  query?: string
  extraParams?: { key: string; value: string }[]
}): Promise<ApiSearchResponse> {
  const prismicAPI = await PrismicClient.getApi()
  const res = await fetch(
    `${REST_API_URL}${
      query
        ? `?q=${query}&ref=${prismicAPI.masterRef.ref}`
        : `?ref=${prismicAPI.masterRef.ref}`
    }${extraParams.map((x) => `&${x.key}=${x.value}`)}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${API_TOKEN}`,
      },
    }
  )

  if (res.status !== 200) {
    console.log(await res.text())
    throw new Error("Failed to fetch API")
  }

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch API")
  }
  return json
}

export async function fetchAllProjects(): Promise<Document[]> {
  const data = await fetchAPI({ query: '[[at(document.type,"project")]]' })
  return data.results.filter((x) => x.type === "project")
}
