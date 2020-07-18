import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import Form from './components/Form.js'
import Input from './components/Input.js'
import Dashboard from './components/Dashboard.js'
import Aside from './components/Aside.js'
import Edit from './components/Edit.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import Navigation from './components/Navigation.js'


class App extends React.Component {

  state = {
    desks: [],
    users: [],
    username: '',
    image: '',
    user_name: '',
    user_email: '',
    user_password: '',
    loggedIn: false,
  }

  getDesks = () => {
    axios
      .get('/desks')
      .then(response => this.setState({
        desks: response.data
      }))
  }
 
  componentDidMount(){
    this.getDesks()
  }

  componentDidMount = () => {
    axios.get('/sessions').then(
      (response) => {
        this.setState({
          session: response.data,
        })
      })
    }

  handleAdd = (event, formInputs) => {
    axios
      .post('/desks', formInputs)
      .then(jsonDesks =>
        this.setState({
        desks: [jsonDesks.data, ...this.state.desks]
        }
      )
    )
    this.getDesks()
  }

  handleDelete = deletedDesk => {
    axios
      .delete('/desks/' + deletedDesk.id)
      .then(() => {
        this.setState((state) => {
          const desks = state.desks.filter((desk, index) => {
            return desk.id !== deletedDesk.id
          })
          return { desks }
        })
      })
      .catch(error => console.log(error)
      )
      console.log('deleting');
    }

  loginUser = (event) => {
    event.preventDefault()
    axios.post('/sessions',
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
    axios.delete('/sessions')
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

  render() {
    return(
      <Router>
        <div className="container">
          <h1 className="title">Deskly</h1>
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
          <div className="nav-container">
            <Navigation />
            <Route path="/login" exact component={Login}/>
            <Route path="/signup" component={Signup}/>
          </div>

          <Aside handleSubmit={this.handleAdd} />
          <Dashboard
            desks={this.state.desks}
            handleDelete={this.handleDelete}
            handleUpdate={this.handleUpdate}
          />
          <br/>


        </div>
      </Router>
    )
  }
}

export default App
