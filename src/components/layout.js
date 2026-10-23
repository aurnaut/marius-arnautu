import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import Header from "./header"
import CoversNav from "./covers-nav"
import "./layout.css"
import '../styles/styles.scss'

// Every page but the homepage carries the covers menu, which leads with the projects itself
const Layout = ({ children, showCoversNav = true }) => {
  return (
    <>
      <Header />
      <div className="site-body">
        {showCoversNav && <CoversNav />}
        <div className="main-wrapper">
          <main className="container">{children}</main>
          <footer>
          © {new Date().getFullYear()}
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
  showCoversNav: PropTypes.bool,
}

export default Layout
