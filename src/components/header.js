import { Link } from "gatsby"
import React from "react"
import Logo from '../images/marius-arnautu-logo.svg';
import TodayDate from '../components/todaydate';

const Header = () => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <img className="logo" src={Logo} alt="Marius Arnautu" />
        </Link>
      </h1>
    </div>
    <TodayDate />
  </header>
)

export default Header
