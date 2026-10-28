import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import Header from "./header"
import CoversNav from "./covers-nav"
import "./layout.css"
import '../styles/styles.scss'

// Every page carries the covers menu in the bar along the bottom of small screens. Beside the column it's left off
// the homepage, which leads with the projects itself. The homepage's short titles also sit in a narrower column.
const Layout = ({ children, coversBeside = true, narrow = false }) => {
  return (
    <>
      <Header />
      <div className="site-body">
        <CoversNav beside={coversBeside} />
        <div className="main-wrapper">
          <main className={narrow ? "container container--narrow" : "container"}>{children}</main>
          <footer>
            <span>© {new Date().getFullYear()}</span>
            <ul className="footer-nav">
              <li><Link to="/about">About</Link></li>
              <li><a href="mailto:marius.arnautu@gmail.com">Contact</a></li>
            </ul>
          </footer>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  coversBeside: PropTypes.bool,
  narrow: PropTypes.bool,
}

export default Layout
