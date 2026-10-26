import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const experience = [
  ["Principal Designer", "Evora Global", "May 2021 – Present"],
  ["UX Designer / Developer", "Evora Global", "Nov 2019 – Apr 2021"],
  ["Contract Front End Developer", "Ridgeway Digital", "Apr 2019 – Oct 2019"],
  [
    "Contract Front End Developer",
    "My Perfect Cosmetics Company",
    "Apr 2018 – Jan 2019",
  ],
  ["Front End Developer", "MMT Digital", "Nov 2016 – Apr 2018"],
  ["Contract UX/UI Designer", "McCann Central", "May 2016 – Nov 2016"],
  ["UX Designer / Developer", "Markerstudy Group", "Sep 2014 – Apr 2016"],
  ["UX Designer", "Creare", "Aug 2012 – Sep 2014"],
]

const AboutPage = () => (
  <Layout>
    <Seo title="About" />
    <article className="case-study">
      <header className="case-study__header">
        <h1>About</h1>
        <p className="case-study__summary">
          I'm a product designer who ships. For the last seven years I've been
          designing and building Evora Global's ESG platform, a B2B SaaS used by
          real estate fund and asset managers to collect energy and carbon data,
          report against frameworks like GRESB and INREV, and plan for net zero
          carbon.
        </p>
        <dl className="case-study__meta">
          <div>
            <dt>Research</dt>
            <dd>FigJam, Miro, Dovetail, Hotjar, Pendo</dd>
          </div>
          <div>
            <dt>Design</dt>
            <dd>Figma, Axure, Adobe XD, Sketch</dd>
          </div>
          <div>
            <dt>Build</dt>
            <dd>React, TypeScript, Tailwind, Storybook, Chromatic</dd>
          </div>
          <div>
            <dt>Test</dt>
            <dd>Vitest, Jest, React Testing Library, Playwright</dd>
          </div>
        </dl>
      </header>
      <div className="case-study__body">
        <p className="about-text">
          I'm most at home with complex, data-dense products: tables people live
          in all day, multi-step workflows with real consequences, permissions,
          and the empty, loading and partial-failure states that make or break
          trust in an enterprise tool.
        </p>

        <h2>How I work</h2>
        <ul className="about-text">
          <li>
            <strong>Research first.</strong> Interviews, Hotjar and Pendo to see
            what people actually do, then FigJam and Miro to make sense of it.
          </li>
          <li>
            <strong>Prototype at the right fidelity.</strong> Flows in FigJam
            for logic, Figma for detail, and coded prototypes when the data is
            the design.
          </li>
          <li>
            <strong>Systems over screens.</strong> Tokens, components and
            Storybook documentation so teams can ship consistent UI without me
            in the room.
          </li>
          <li>
            <strong>Ship and measure.</strong> I agree what success looks like
            before we build, then build and test what I design. After launch,
            product analytics, Pendo and Hotjar show what people actually do,
            and when the numbers say a design isn't working, it goes back on the
            board.
          </li>
        </ul>

        <h2>Experience</h2>
        <ul className="experience">
          {experience.map(([role, company, period]) => (
            <li key={`${role}-${period}`}>
              <span>
                <strong>{role}</strong> · {company}
              </span>
              <span className="experience__period">{period}</span>
            </li>
          ))}
        </ul>

        <h2>Education</h2>
        <p>
          BA in Communication Sciences and Advertising, University of Bucharest.
        </p>

        <h2>Contact</h2>
        <p>
          <a href="mailto:marius.arnautu@gmail.com">marius.arnautu@gmail.com</a>
        </p>
      </div>
    </article>
  </Layout>
)

export default AboutPage
