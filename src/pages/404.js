import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { CoverHero } from "../components/covers"

// The sneaker runs on its track, for a page that's run off its own. It's only decoration, so it's hidden from screen readers.
const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <article className="case-study">
      <header className="case-study__header">
        <div aria-hidden="true">
          <CoverHero slug="/404/" title="" />
        </div>
        <h1>Off track</h1>
        <p className="case-study__summary">
          This page doesn't exist, or it's run off somewhere. Head back <Link to="/">home</Link>.
        </p>
      </header>
    </article>
  </Layout>
)

export default NotFoundPage
