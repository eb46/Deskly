import React from 'react'
import Desks from './Desks.js'

function Dashboard(props) {
  const { desks, handleDelete, handleUpdate } = props
  console.log(props.desks);
  return (
      <Desks
        desks={desks}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    )
  }

export default Dashboard
