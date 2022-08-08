import React, { useEffect } from 'react'
import { useContext } from 'react';
import { getUser, updateUser } from '../services/board';
import { Context } from './context/Context';

export default function Profile() {
 

  const { user , userLogin} = useContext(Context);
  console.log(user)

  
  useEffect(() =>{
    getUser(user.id)
  }, [user])

  const onSubmit = async (e) => {
    e.preventDefault();

   
    try {
      const profileData = Object.fromEntries(new FormData(e.target));
      updateUser(user.id, profileData)
      //update user data
      //add change password
      
    } catch (error) {
      console.log({error:error.message})
    }
  };

  return (
    <div>
    <section id="profile-page" className="profile">
      <img src={user.image} alt="UserImg" width="90" height="90"></img>
      <form id="profile" onSubmit={onSubmit}>
        <div className="container">
          <h1>User details</h1>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder={user.username}
            value= {user.username}
          ></input>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder={user.image}
            value= {user.image}
          />
          <input
            className="btn submit"
            type="submit"
            value="Change them"
          />
        </div>
      </form>
    </section>

<section id="profile-page" className="profile">
<form id="profile" onSubmit={onSubmit}>
  <div className="container">
    <h1>Password change</h1>
    <label htmlFor="password">Password:</label>
    <input
      type="text"
      id="username"
      name="username"
      placeholder='Add new password here'
  
    ></input>
    <input
      className="btn submit"
      type="submit"
      value="Change password"
    />
  </div>
</form>
</section>
</div>
  );
}
