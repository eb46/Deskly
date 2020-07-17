import React from 'react'
import Desks from './Desks.js'

function Dashboard(props) {
  const { desks, handleDelete, handleUpdate } = props
  return (
    <div>
      <Desks
        desks={desks}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  )
}

export default Dashboard