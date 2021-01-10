import React, { ReactElement, useEffect, useState } from "react"
import { fetchAllProjects } from "../vendor/api"
import { Document, ProjectIcon } from "../index"
import { GitHub, Globe, HelpCircle, Link } from "react-feather"
import chunk from "lodash.chunk"
import orderBy from "lodash.orderby"
import Head from "../components/head"
import { GetStaticProps } from "next"
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik"
import * as Yup from "yup"

const Heading = ({
  textPrefix,
  textSuffix,
}: {
  textPrefix: string
  textSuffix: string
}): ReactElement => {
  return (
    <h3 className="text-slate dark:text-white px-6 pt-6 md:px-12 md:pt-12 pb-0 text-6xl lg:text-7xl uppercase">
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

interface FormValues {
  emailAddress: string
  messageSubject: string
  message: string
}

const SignUpSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .email("Please provide a valid email address")
    .required("Please provide a valid email address"),
  messageSubject: Yup.string()
    .min(10, "Your message subject must be longer than 10 characters")
    .required("You need to provide a subject that is at least 10 characters"),
  message: Yup.string()
    .min(80, "Your message must be longer than 80 characters")
    .required("You need to provide a message that is 80 characters"),
})

const Index = ({ projects }: { projects: Document[] }): ReactElement => {
  const [messageToDisplay, setMessageToDisplay] = useState("Send")
  const projectsSortedByIndex = orderBy(projects, "data.index", ["asc", "desc"])
  const projectChunks = chunk(projectsSortedByIndex, 4)
  const aboveTheFoldProjects = chunk(projectChunks[0], 2)
  useEffect(() => {
    setTimeout(() => setMessageToDisplay("Send"), 10000)
  }, [messageToDisplay])
  const encode = (data): string => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&")
  }
  return (
    <>
      <form
        data-netlify="true"
        hidden={true}
        name="Work With Me"
        netlify-honeypot="bot-field">
        <input type="email" name="emailAddress" />
        <input type="text" name="messageSubject" />
        <textarea rows={3} name="message" />
        <input name="bot-field" type="hidden" />
      </form>
      <Head
        title="Caleb Delbridge"
        description="Fullstack Developer & Student of Life"
        url={process.env.NEXT_PUBLIC_META_URL}
        image={process.env.NEXT_PUBLIC_META_IMAGE_PATH}
      />
      <div className="h-auto bg-white dark:bg-slate">
        <div className="flex flex-col flex-wrap justify-center h-screen px-4">
          <h1 className="text-slate dark:text-white px-6 md:px-12 text-6xl lg:text-7xl uppercase">
            <span className="font-extralight">Caleb</span>
            <span className="font-bold block md:inline">Delbridge</span>
          </h1>
          <h2 className="text-slate dark:text-white font-extralight px-6 md:px-12 text-lg lg:text-xl ml-0 md:ml-2">
            Fullstack Developer & Student of Life
          </h2>
        </div>
        <Heading textPrefix="My" textSuffix="Projects" />
        <div className="grid gap-0 grid-cols-1 lg:grid-cols-2 h-auto text-slate dark:text-white p-3 md:p-6">
          {aboveTheFoldProjects.map((arrayOfProjects: Document[]) => {
            return (
              <>
                {arrayOfProjects.map((singleProject, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-transparent border p-4 w-auto m-3 md:m-6 border-slate dark:border-white">
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
                            "bg-warning-yellow p-2 py-1 text-slate font-bold text-xs mr-2 whitespace-nowrap leading-none inline-block"
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
        </div>
        <Heading textPrefix="Work" textSuffix="WithMe" />
        <div>
          <Formik
            initialValues={{
              emailAddress: "",
              messageSubject: "",
              message: "",
              "bot-field": "",
            }}
            onSubmit={(
              values: FormValues,
              { setSubmitting, resetForm }: FormikHelpers<FormValues>
            ) => {
              fetch("/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: encode({ "form-name": "Work With Me", ...values }),
              })
                .then(() => {
                  setMessageToDisplay("Message has successfully been delivered")
                  resetForm()
                })
                .catch(() => {
                  setMessageToDisplay(
                    "An error has occurred while delivering the message"
                  )
                })
                .finally(() => setSubmitting(false))
            }}
            validationSchema={SignUpSchema}>
            {({ isSubmitting }) => (
              <Form className="p-6 md:p-12 pt-6 ">
                <label
                  className="text-slate dark:text-white inline-block"
                  htmlFor="emailAddress">
                  Email Address
                </label>
                <Field
                  id="emailAddress"
                  name="emailAddress"
                  placeholder="Enter Email"
                  type="email"
                  className="mt-2 p-2 w-full dark:bg-slate-light caret-white outline-none px-3 text-slate dark:text-white border border-slate dark:border-slate-light"
                />
                <ErrorMessage name="emailAddress">
                  {(msg) => (
                    <span className="w-full inline-block text-red-550 text-sm">
                      {msg}
                    </span>
                  )}
                </ErrorMessage>

                <label
                  className="mt-4 text-slate dark:text-white inline-block"
                  htmlFor="messageSubject">
                  Message Subject
                </label>
                <Field
                  id="messageSubject"
                  name="messageSubject"
                  placeholder="Enter Subject"
                  className="mt-2 p-2 w-full dark:bg-slate-light caret-white outline-none px-3 text-slate dark:text-white border border-slate dark:border-slate-light"
                />
                <ErrorMessage name="messageSubject">
                  {(msg) => (
                    <span className="w-full inline-block text-red-550 text-sm">
                      {msg}
                    </span>
                  )}
                </ErrorMessage>

                <label
                  className="mt-4 text-slate dark:text-white inline-block"
                  htmlFor="message">
                  Your Message
                </label>
                <Field
                  id="message"
                  name="message"
                  placeholder="Enter your proposal, question, anything?"
                  as="textarea"
                  className="mt-2 p-2 w-full dark:bg-slate-light caret-white outline-none px-3 text-slate dark:text-white border border-slate dark:border-slate-light"
                  rows={3}
                />
                <ErrorMessage name="message">
                  {(msg) => (
                    <span className="w-full inline-block text-red-550 text-sm">
                      {msg}
                    </span>
                  )}
                </ErrorMessage>
                <Field type="hidden" name="bot-field" />
                <button
                  className={
                    "w-full bg-slate-light text-white p-2 mt-4 " +
                    (isSubmitting && "cursor-not-allowed opacity-50")
                  }
                  type="submit">
                  {isSubmitting ? "Sending..." : messageToDisplay}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <footer className="pb-5 text-center text-slate dark:text-white">
          Built with Next.js & Tailwind |{" "}
          <a
            href="https://github.com/CalebDelbridge/my-website"
            target="_blank"
            rel="noreferrer"
            className="underline">
            Source Code
          </a>
        </footer>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: { projects: Document[] }
}> => {
  const allProjects = await fetchAllProjects()
  return {
    props: { projects: allProjects },
  }
}

export default Index
