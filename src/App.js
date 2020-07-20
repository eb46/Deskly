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
      .get('https://cors-anywhere.herokuapp.com/https://deskly-backend.herokuapp.com/desks')
      .then(response => this.setState({
        desks: response.data
      }))
  }

  async componentDidMount(){
    await this.getDesks()
    console.log('component did mount route');
  }

  handleAdd = (event, formInputs) => {
    axios
      .post('https://cors-anywhere.herokuapp.com/https://deskly-backend.herokuapp.com/desks', formInputs)
      .then(jsonDesks => {
        console.log(jsonDesks.data);
        this.setState({
        desks: [jsonDesks.data, ...this.state.desks]
        }
      )}
    )
    // this.getDesks()
    console.log('add working');
  }

  handleDelete = deletedDesk => {
    axios
      .delete('https://cors-anywhere.herokuapp.com/https://deskly-backend.herokuapp.com/desks/' + deletedDesk.id)
      .then(() => {
        this.setState((state) => {
          const desks = state.desks.filter((desk, index) => {
            return desk.id !== deletedDesk.id
          })
          return { desks }
          console.log(deletedDesk.id);
        })
      })
      .catch(error => console.log(error)
      )
      console.log('deleting working');
      this.getDesks()
    }

  render() {
    return(
      <Router>
        <div className="container">
          <h1 className="title">Deskly</h1>

          <div className="nav-container">
            <Navigation />
            <Route path="/login" exact component={Login}

            />
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
