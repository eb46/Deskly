import React from 'react'
import Form from './Form.js'
import Edit from './Edit.js'
import deletebutton from '../images/delete.png'

class Desk extends React.Component {
  state = {
    showForm: false,
    errorExists: false,
    showErrorImage: 'https://i.ytimg.com/vi/z8wrRRR7_qU/maxresdefault.jpg'
  }

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  errorImage = () => {
    this.setState({
      errorExists: true
    })
    console.log('error exists');

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
            src={
                  this.state.errorExists
                ?
                  this.state.showErrorImage
                :
                  desk.image
                }
            onError={this.errorImage}
          />
          <p>
            Submitted by: {desk.username}
          </p>
          <div className="desk-card-buttons">
            <button
              className="delete-button btn btn-dark" onClick={()=>handleDelete(desk)}>
              Delete
            </button>

          </div>
        </div>
      }
      </React.Fragment>
    )
  }

}

export default Desk
