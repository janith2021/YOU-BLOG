import React from 'react'
import { Navigate } from 'react-router-dom'

function Redirecthandling() {  
  return ( 
  <Navigate to={'/'}/>
  )
}

export default Redirecthandling