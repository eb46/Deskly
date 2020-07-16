import React from 'react'
import axios from 'axios'

class Login extends React.Component {
  state = {
    loggedIn: false,
    user_name: null,
    user_email: null,
    user_password: null,
    session: {}
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/sessions').then(
      (response) => {
        this.setState({
          session: response.data,
        })
    })
  }

  loginUser = (event) => {
    event.preventDefault()
    axios.post('http://localhost:5000/sessions',
      {
        user_name: this.state.loginUsername,
        user_email: this.state.loginEmail,
        user_password: this.state.loginPassword
      }
    ).then((response) => {
      console.log('=========');
      console.log(response.data);
      this.setState({
        session: response.data,
        loggedIn: true
      })
      console.log(this.state.loggedIn);
      // console.log(this.state.session);
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

  logoutUser = (event) => {
    axios.delete('http://localhost:5000/sessions')
      .then((response) => {
        this.setState({
          loggedIn: false,
        })
        // console.log(response.data.destroyed);
        if (response.data.destroyed === true){
          console.log('session destroyed');
        }
        // console.log(this.state.session.rows[0].user_name);
      })
    }

  render () {
    return (
      <div>

        { this.state.loggedIn
          ?
            <div>
              <h3>
                Welcome {this.state.session.user.rows[0].user_name}!!!
              </h3>
              <button onClick={this.logoutUser}>Logout</button>
            </div>
          :

          <form onSubmit={this.loginUser}>
          <h1>Login</h1>
            <input type="text" placeholder="email" onKeyUp={this.changeLoginEmail}/>
            <input type="text" placeholder="password" onKeyUp={this.changeLoginPassword}/>
            <input type="submit" value="Login"/>
          </form>
        }
      </div>
    )
  }
}

export default Login
