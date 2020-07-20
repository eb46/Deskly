import React from 'react'
import Form from './Form.js'

function Aside(props) {
  return (
    <aside>
      <Form handleSubmit={props.handleSubmit} />
    </aside>
  )
}

export default Aside
