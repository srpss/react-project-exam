import React from 'react'
import { useContext } from 'react';
import { Context } from './context/Context';

export default function Profile() {
  const user = useContext(Context)

  return (
    <div className='profile'>
      <ul>
        <li>Username: {user.user.username}</li>
        <li>Image: <img src={user.user.image} alt="UserImg" width="45" height="45"></img></li>
        <li>Role: {user.user.role}</li>
      </ul>
    </div>
  )
}
