import React from 'react'
import axios from 'axios'

class Edit extends React.Component {
  state = {
    editForm: false
  }

  refreshPage = () => {
    window.location.reload()
  }

  // UPDATE
  updateDesk = (event) => {
    const id = event.target.getAttribute('id')
    axios.put('https://cors-anywhere.herokuapp.com/https://deskly-backend.herokuapp.com/desks/' + id,
      {
        username: this.state.updateUsername,
        image: this.state.updateImage
      }
    ).then(
      (response) => {
        this.setState({
          desks: response.data
        })
      }
    )
    this.refreshPage()
  }

  editUsername = (event) => {
    this.setState({
      updateUsername: event.target.value
    })
  }

  editImage = (event) => {
    this.setState({
      updateImage: event.target.value
    })
  }

  toggleEditForm = () => {
    this.setState({
      editForm: !this.state.editForm
    })
  }

  render () {
    const { desks } = this.props
    return(
      <div>

        <button className="btn btn-dark" onClick={this.toggleEditForm}>
          Edit
        </button>

        { this.state.editForm
          ?
            <form id={desks.id} onSubmit={this.updateDesk}>
              <input type="text" placeholder="Name" onKeyUp={this.editUsername} />
              <input type="text" placeholder="Image URL" onKeyUp={this.editImage} />
              <input type="submit" value="Edit"/>
            </form>
          :
            null
        }


      </div>
    )
  }
}

export default Edit
