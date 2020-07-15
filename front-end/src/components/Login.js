import React from 'react'
import axios from 'axios'

class Login extends React.Component {
  state = {
    user_name: '',
    user_email: '',
    user_password: ''
  }

  loginUser = (event) => {
    axios.post('http://localhost:5000/sessions',
      {
        user_name: this.state.loginUsername,
        user_email: this.state.loginEmail,
        user_password: this.state.loginPassword
      }
    ).then((response) => {
      this.setState({
        users: response.data
      })
    })
  }

  changeLoginUser = (event) => {
    this.setState({
      loginUsername: event.target.value
    })
  }

  changeLoginEmail = (event) => {
    this.setState({
      loginEmail: event.target.value
    })
  }

  changeLoginPassword = (event) => {
    this.setState({
      loginPassword: event.target.value
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.loginUser}>
          <input type="text" placeholder="email" onKeyUp={this.changeLoginEmail}/>
          <input type="text" placeholder="password" onKeyUp={this.changeLoginPassword}/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    )
  }
}

export default Login
