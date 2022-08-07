import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='not-found'>You need to login first <Link to="/login">Login</Link></div>
  )
}
