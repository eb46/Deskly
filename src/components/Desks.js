import React from 'react'
import Desk from './Desk.js'

function Desks(props) {
  const { desks, handleDelete, handleUpdate } = props
  return (
    <div>
      {desks.map((desk, index) => <Desk
          key={index}
          desk={desk}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

export default Desks
