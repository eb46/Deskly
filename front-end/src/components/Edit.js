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
    axios.put('http://localhost:5000/desks/' + id,
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

        <button onClick={this.toggleEditForm}>
          <img src="https://img.icons8.com/metro/26/000000/edit-row.png"/>
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
