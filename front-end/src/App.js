import React from 'react';
import axios from 'axios';
import Edit from './components/Edit.js'

class App extends React.Component {

  state = {
    desks: [],
    username: '',
    image: ''
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

  // READ - Individual show

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

  render() {
    return(
      <div>
        <h1>Hello world</h1>

        <form onSubmit={this.createDesk}>
          <input type="text" onKeyUp={this.changeNewUsername}/>
          <input type="text" onKeyUp={this.changeNewImage}/>
          <input type="submit" value="Add Desk"/>
        </form>

        {this.state.desks.map((desk, index) => {
          return <div>
            <img src={desk.image} />
            <h4>{desk.username}</h4>
            <Edit desks={desk} />
            <button value={desk.id} onClick={this.deleteDesk}>
              X
            </button>
          </div>
        })}



      </div>
    )
  }
}

export default App;
