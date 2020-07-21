import React from 'react'
import Form from './Form.js'
import styles from '../index.css'

function Aside(props) {
  return (
    <div>
      <Form
        toggleAdd={props.toggleAdd}
        handleSubmit={props.handleSubmit}
      />
    </div>
  )
}

export default Aside
