import React from 'react'
import { Link } from 'react-router-dom'

class Navigation extends React.Component {

  render () {
    return (
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/">Add</Link>
      </nav>
    )
  }
}

export default Navigation
