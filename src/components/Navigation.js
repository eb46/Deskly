import React from 'react'
import { Link } from 'react-router-dom'

function Navigation(props) {
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <button onClick={props.showAdd}>Add</button>
    </nav>
  )
}

export default Navigation
