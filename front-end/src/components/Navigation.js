import React from 'react'
import { Link } from 'react-router-dom'

class Navigation extends React.Component {

  render () {
    return (
      <nav>
        <Link to="/login">Login</Link>
        <br/>
        <Link to="/signup">Signup</Link>
      </nav>
    )
  }
}

export default Navigation
