import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as boardService from '../services/board';


export default function Register() {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const registerData = Object.fromEntries(new FormData(e.target));
    console.log(registerData)
    try {
      const userData = await boardService.register(registerData)
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
           Already have an account? - <Link to="/login">Register</Link>
          </p>
        </div>
      </form>
    </section>
  );
}


