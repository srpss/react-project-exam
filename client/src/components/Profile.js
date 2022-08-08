import React, { useEffect } from 'react'
import { useContext } from 'react';
import { getUser } from '../services/board';
import { Context } from './context/Context';

export default function Profile() {
 

  const { user } = useContext(Context);
  console.log(user)

  
  useEffect(() =>{
    getUser(user.id)
  }, [user])

  const onSubmit = async (e) => {
    e.preventDefault();

    const profileData = Object.fromEntries(new FormData(e.target));
   
    try {
   
      
    } catch (error) {
      console.log({error:error.message})
    }
  };

  return (
    <section id="profile-page" className="profile">
      <img src={user.image} alt="UserImg" width="90" height="90"></img>
      <form id="profile" onSubmit={onSubmit}>
        <div className="container">
          <h1>Create board thread</h1>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder={user.username}
          ></input>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder={user.image}
          />
          <input
            className="btn submit"
            type="submit"
            value="Create Game"
          />
        </div>
      </form>
    </section>
  );
}
