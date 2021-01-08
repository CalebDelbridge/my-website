import React, { ReactElement } from "react"
import { ToastProvider } from "react-toast-notifications"
import { fetchAllProjects } from "../vendor/api"
import { Document, ProjectIcon } from "../index"
import { GitHub, Globe, HelpCircle, Link } from "react-feather"
import chunk from "lodash.chunk"
import orderBy from "lodash.orderby"
import Head from "../components/head"
import { GetStaticProps } from "next"

const Heading = ({
  textPrefix,
  textSuffix,
}: {
  textPrefix: string
  textSuffix: string
}): ReactElement => {
  return (
    <h3 className="text-slate dark:text-white px-12 pt-12 pb-0 text-5xl md:text-6xl lg:text-7xl uppercase">
      <span className="font-extralight">{textPrefix}</span>
      <span className="font-bold block md:inline">{textSuffix}</span>
    </h3>
  )
}

const Icon = ({ iconType }: { iconType: ProjectIcon }): ReactElement => {
  switch (iconType) {
    case "code":
      return <GitHub className="icon" size={25} />
    case "help":
      return <HelpCircle className="icon" size={25} />
    case "link":
      return <Link className="icon" size={25} />
    case "website":
      return <Globe className="icon" size={25} />
  }
}

const Index = ({ projects }: { projects: Document[] }): ReactElement => {
  const projectsSortedByIndex = orderBy(projects, "data.index", ["asc", "desc"])
  const projectChunks = chunk(projectsSortedByIndex, 4)
  const aboveTheFoldProjects = chunk(projectChunks[0], 2)
  return (
    <ToastProvider>
      <Head
        title="Caleb Delbridge"
        description="I am a Fullstack Developer & Student"
        url={process.env.NEXT_PUBLIC_META_URL}
        image={process.env.NEXT_PUBLIC_META_IMAGE_PATH}
      />
      <div className="h-screen bg-white dark:bg-slate">
        {/* <section className="flex flex-col flex-wrap justify-center bg-yellow-400 h-screen px-4">
          <h1 className="text-7xl md:text-8xl lg:text-9xl whitespace-normal md:whitespace-nowrap">
            Caleb Delbridge
          </h1>
          <h2>I am a Fullstack & Discord Bot Developer</h2>
        </section> */}
        <Heading textPrefix="My" textSuffix="Projects" />
        <section className="grid gap-0 grid-cols-1 lg:grid-cols-2 h-auto text-slate dark:text-white p-6">
          {aboveTheFoldProjects.map((arrayOfProjects: Document[]) => {
            return (
              <>
                {arrayOfProjects.map((singleProject, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-transparent border p-4 w-auto m-6 border-slate dark:border-white">
                      <h2 className="text-4xl">
                        {singleProject.data.title[0].text}
                      </h2>
                      <div className="flex flex-nowrap mt-2">
                        {singleProject.data.icons.map((icon, index) => {
                          return (
                            <a
                              className="mr-1"
                              key={index}
                              href={icon.link.url}
                              target="_blank"
                              rel="noreferrer">
                              <Icon iconType={icon.type} />
                            </a>
                          )
                        })}
                      </div>
                      <p className="text-base mt-2 my-4">
                        {singleProject.data.description[0].text}
                      </p>
                      <div className="mb-2">
                        {singleProject.data.badges.map((badge, index) => {
                          const classesToApply =
                            "bg-warning-yellow p-2 py-1 text-slate font-black text-xs mr-2"
                          if (badge.link.url) {
                            return (
                              <a key={index} href={badge.link.url}>
                                <span className={classesToApply}>
                                  {badge.content[0].text}
                                </span>
                              </a>
                            )
                          } else {
                            return (
                              <span key={index} className={classesToApply}>
                                {badge.content[0].text}
                              </span>
                            )
                          }
                        })}
                      </div>
                    </div>
                  )
                })}
              </>
            )
          })}
        </section>
      </div>
    </ToastProvider>
  )
}

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: { projects: Document[] }
  revalidate: number
}> => {
  const allProjects = await fetchAllProjects()
  return {
    props: { projects: allProjects },
    revalidate: 1,
  }
}

export default Index
