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

  // CREATE
  // createDesk = (event) => {
  //   axios.post('http://localhost:5000/desks',
  //     {
  //       username: this.state.newUsername,
  //       image: this.state.newImage
  //     }
  //   ).then((response) => {
  //     this.setState({
  //       desks: response.data
  //     })
  //     console.log(response.data);
  //   })
  // }

  // changeNewUsername = (event) => {
  //   this.setState({
  //     newUsername: event.target.value
  //   })
  // }
  //
  // changeNewImage = (event) => {
  //   this.setState({
  //     newImage: event.target.value
  //   })
  // }

  // componentDidMount = () => {
  //   axios.get('http://localhost:5000/desks').then(
  //     (response) => {
  //       this.setState({
  //         desks: response.data
  //       })
  //   })
  // }
  //
  // // DELETE
  // deleteDesk = (event) => {
  //   const id = event.target.value
  //   axios.delete('http://localhost:5000/desks/' + id).then(
  //     (response) => {
  //       this.setState(
  //         {
  //           desks: response.data
  //         }
  //       )
  //     }
  //   )
  //   this.refreshPage()
  // }

  componentDidMount(){
    this.getDesks()
  }

  getDesks = () => {
    axios
      .get('/desks')
      .then(response => this.setState({
        desks: response.data
      }))
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
      .delete(`/desks/${deletedDesk.id}`)
      .then(() => {
        this.setState(state => {
          const desks = state.desks.filter((desk) => {
            return desk.id !== deletedDesk.id
          })
          return { desks }
        })
      })
      .catch(error => console.log(error)
      )
      this.getDesks()
    }


  // LOGIN

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

// Submit for for desks
// <form onSubmit={this.createDesk}>
//   <input type="text" placeholder="name" onKeyUp={this.changeNewUsername}/>
//   <input type="text" placeholder="image url" onKeyUp={this.changeNewImage}/>
//   <input type="submit" value="Add Desk"/>
// </form>


// Read all for desks
// {this.state.desks.map((desk, index) => {
//   return <div className="desk-cards">
//     <img className="img-fluid mx-auto d-block" src={desk.image} />
//     <p>Submitted by: {desk.username}</p>
//     <div className="desk-card-buttons">
//       <Edit className="edit-button" desks={desk} />
//       <button className="delete-button btn btn-dark" value={desk.id} onClick={this.deleteDesk}>
//         Delete
//       </button>
//     </div>
//   </div>
//
// })}
