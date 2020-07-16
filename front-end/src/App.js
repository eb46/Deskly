import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
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

  refreshPage = () => {
    window.location.reload()
  }

  // CREATE
  createDesk = (event) => {
    axios.post('http://localhost:5000/desks',
      {
        username: this.state.newUsername,
        image: this.state.newImage
      }
    ).then((response) => {
      this.setState({
        desks: response.data
      })
      console.log(response.data);
    })
  }

  changeNewUsername = (event) => {
    this.setState({
      newUsername: event.target.value
    })
  }

  changeNewImage = (event) => {
    this.setState({
      newImage: event.target.value
    })
  }

  // READ

  componentDidMount = () => {
    axios.get('http://localhost:5000/desks').then(
      (response) => {
        this.setState({
          desks: response.data
        })
    })
  }

  // DELETE
  deleteDesk = (event) => {
    const id = event.target.value
    axios.delete('http://localhost:5000/desks/' + id).then(
      (response) => {
        this.setState(
          {
            desks: response.data
          }
        )
      }
    )
    this.refreshPage()
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


    console.log('deleting...');
  }

  render() {
    return(
      <Router>
        <div className="container">
          <h1 className="title">Deskly</h1>

          <div className="nav-container">
            <Navigation />
            <Route path="/login" exact component={Login}/>
            <Route path="/signup" component={Signup}/>
          </div>

          <form onSubmit={this.createDesk}>
            <input type="text" placeholder="name" onKeyUp={this.changeNewUsername}/>
            <input type="text" placeholder="image url" onKeyUp={this.changeNewImage}/>
            <input type="submit" value="Add Desk"/>
          </form>

          <br/>

          {this.state.desks.map((desk, index) => {
            return <div className="desk-cards">
              <img className="img-fluid rounded mx-auto d-block" src={desk.image} />
              <h4>{desk.username}</h4>
              <Edit desks={desk} />
              <button className="btn btn-dark" value={desk.id} onClick={this.deleteDesk}>
                Delete
              </button>
              <br/>
              <br/>
            </div>

          })}
        </div>
      </Router>
    )
  }
}

export default App;
