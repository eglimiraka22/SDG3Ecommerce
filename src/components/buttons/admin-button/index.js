import React from 'react'
import './style.css'
const AdminButton = ({onClick , Text}) => {
  return (
    <button className='admin-button' onClick={onClick}>
          <span className=''>
          </span>
         {Text}
        </button>
  )
}

export default AdminButton
