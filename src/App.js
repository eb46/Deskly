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
import Footer from './components/Footer.js'


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
    showAdd: false
  }

  toggleAdd = () => {
    this.setState((prevState) => {
      return {showAdd: !prevState.showAdd}
    })
    // console.log('toggle working');
    // console.log(this.state.showAdd);
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
        )
      this.getDesks()
      }
    )
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
          <div className="nav-container">
            <Navigation showAdd={this.toggleAdd}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/signup" component={Signup}/>
          </div>

          { this.state.showAdd
            ?

              <Aside
                showAdd={this.state.showAdd}
                toggleAdd={this.toggleAdd}
                handleSubmit={this.handleAdd}
              />

            :
              null
          }
          <Dashboard
            desks={this.state.desks}
            handleDelete={this.handleDelete}
            handleUpdate={this.handleUpdate}
          />
          <br/>


        </div>
        <Footer />
      </Router>
    )
  }
}

export default App
