import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import gatsbyIcon from "../images/gatsby-icon.png"

const Header = ({ siteTitle }) => (
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
      {/* Title/Logo area */}
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <img src={gatsbyIcon} alt="Gatsby Garb logo" style={{ margin: '0 5px', width: '50px', border: '3px solid orange', borderRadius: '50%' }} />
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </span>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
