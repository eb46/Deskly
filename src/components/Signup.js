import React from 'react'
import axios from 'axios'

class Signup extends React.Component {
  state = {
    users: []
  }

  // CREATE
    createUser = (event) => {
      axios.post('http://localhost:5000/users',
        {
          user_name: this.state.newUsername,
          user_email: this.state.newEmail,
          user_password: this.state.newPassword
        }
      ).then((response) => {
          this.setState({
            users: response.data
          })
      })
    }

    changeNewUsername = (event) => {
      this.setState({
        newUsername: event.target.value
      })
    }

    changeNewEmail = (event) => {
      this.setState({
        newEmail: event.target.value
      })
    }

    changeNewPassword = (event) => {
      this.setState({
        newPassword: event.target.value
      })
    }

    render () {
      return (
        <div>

          <h1>Sign-up</h1>

          <form onSubmit={this.createUser}>
            <input type="text" placeholder="username" onKeyUp={this.changeNewUsername}/>
            <input type="text" placeholder="email address" onKeyUp={this.changeNewEmail}/>
            <input type="text" placeholder="password" onKeyUp={this.changeNewPassword}/>
            <input type="submit" value="Create User"/>
          </form>

        </div>
      )
    }
}

export default Signup
