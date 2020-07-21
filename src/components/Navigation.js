import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

function Navigation(props) {
  return (
    <nav>
      <div className="left-nav">
        <img className="logo" src={logo} />

        <button
          className="add-button"
          onClick={props.showAdd}
        >
          Add
        </button>
      </div>
      <div >
        <Link className="login-links" >Login</Link>
        <Link className="login-links" >Signup</Link>
      </div>
    </nav>
  )
}

export default Navigation
