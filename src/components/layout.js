import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import Header from "./header"
import "./layout.css"
import '../styles/styles.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="main-wrapper">
        <main>{children}</main>
        <footer>
        © {new Date().getFullYear()}
          <ul className="footer-nav">
            <li><Link to="/projects">Work</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><a href="mailto:marius.arnautu@gmail.com">Contact</a></li>
          </ul>
           Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
