import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as boardService from '../services/board';


export default function Login() {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const loginData = Object.fromEntries(new FormData(e.target));
    console.log(loginData)
    try {
      await boardService.login(loginData)
      navigate(`/`);
    } catch (error) {
      console.log({error:error.message})
    }
  }

  return (
    <section className="create">
      <form id="login"  onSubmit={onSubmit}>
        <div>
          <h1>Login</h1>
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
            Need to register? - <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </section>
  );
}


