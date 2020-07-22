import React from 'react'

function Input(props) {
  const { handleChange, name, placeholder, type, value, id } = props
  return (
    <React.Fragment>
      <label htmlFor={name}>{name}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
    </React.Fragment>
  )
}

export default Input
