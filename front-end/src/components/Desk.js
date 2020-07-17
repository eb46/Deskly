import React from 'react'
import Form from './Form.js'
import Edit from './Edit.js'

class Desk extends React.Component {
  state = {
    showForm: false
  }

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  render(){
    const { desk, handleUpdate, handleDelete } = this.props
    return(
      <React.Fragment>
      { this.state.showForm
        ?
          <Form
            desk={desk}
            handleSubmit={handleUpdate}
            toggleForm={this.toggleForm}
          >
            <button onClick={this.toggleForm}>Exit</button>
          </Form>
        :
        <div className="desk-cards">
          <img
            className="img-fluid mx-auto d-block"
            src={desk.image}
          />
          <p>
            Submitted by: {desk.username}
          </p>
          <div className="desk-card-buttons">
            <button
              className="delete-button btn btn-dark" onClick={()=>handleDelete(desk)}>
              Delete
            </button>
            <button
              className="btn btn-dark"
              onClick={this.toggleForm}>
              Edit
            </button>
          </div>
        </div>
      }
      </React.Fragment>
    )
  }

}

export default Desk
