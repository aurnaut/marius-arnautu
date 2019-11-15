import { Link } from "gatsby"
import React from "react"
import Logo from '../images/marius-arnautu-logo-thin.svg';
import TodayDate from '../components/todaydate';

const Header = () => (
  <header>
    <div>
      <Link className="logo-link" to="/">
        <img className="logo" src={Logo} alt="Marius Arnautu" />
      </Link>
      <TodayDate />
    </div>
  </header>
)

export default Header
