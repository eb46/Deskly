import React from 'react'
import Input from './Input.js'

class Form extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      image: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    if (this.props.desks) {
      this.setState({
        username: this.props.desks.username,
        image: this.props.desks.image
      })
    }
  }

  handleChange(event){
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.handleSubmit(event, {
      username: this.state.username,
      image: this.state.image
    })
    this.setState({
      username: '',
      image: ''
    })
    if (this.props.desk) {
      this.props.toggleForm()
    }
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <Input
          handleChange={this.handleChange}
          name={'username'}
          placeholder={'Name'}
          type={'text'}
          value={this.state.username}
          id={'username'}
        />
        <Input
          handleChange={this.handleChange}
          name={'image'}
          placeholder={'Desk Image URL'}
          type={'text'}
          value={this.state.image}
          id={'image'}
        />
        <input
          type="submit"
          value={this.props.desk ? 'Update' : 'Add'}
        />
        {this.props.children}
      </form>
    )
  }
}

export default Form
