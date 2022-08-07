import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Context } from './context/Context';
import { useContext } from 'react';
import * as boardService from '../services/board';


export default function Register() {
  const navigate = useNavigate();
  const { userLogin } = useContext(Context);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const registerData = Object.fromEntries(new FormData(e.target));
    
    try {
      await boardService.register(registerData)
      const userData = await boardService.login(registerData)
      userLogin(userData)
      navigate(`/`);
     
    } catch (error) {
      console.log({error:error.message})
    }
  }

  return (
    <section className="create">
      <form id="register"  onSubmit={onSubmit}>
        <div>
          <h1>Register</h1>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            placeholder="martin.slavov"
          />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <input type="submit" className="btn submit" defaultValue="Login" />
          <p>
           Already have an account? - <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </section>
  );
}


