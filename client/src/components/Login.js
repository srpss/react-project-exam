import React from 'react'
import { useContext, useState } from 'react';
import { Context } from './context/Context';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as boardService from '../services/board';




export default function Login() {
  const { userLogin } = useContext(Context);
  const navigate = useNavigate();

  //const intialValues = { username: "", password: "" }
  const [formValues, setFormValues] = useState({ username: "", password: "" })
  const [formErrors, setFormErrors] = useState({})
  const [error, setError] = useState()
  let veri = ""

  const onSubmit = async (e) => {
    e.preventDefault();
     validate(formValues)
    try {
     
      if (Object.keys(veri).length !== 0 ) {
   
        return
      }
      
      const loginData = Object.fromEntries(new FormData(e.target));


      const userData = await boardService.login(loginData)

      if (userData.error) {
        setError(userData.error)
        return
      }
      userLogin(userData)

      navigate(`/`);

    } catch (error) {
      console.log({ error: error.message })
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })

  }

  const validate = (values) => {
    const errors = {}
    if (!values?.username) {
      errors.username = "Username is required!"
    }
    if (!values?.password) {
      errors.password = "Password is required!"
    }
    veri = errors
   setFormErrors(errors)
   
  }


  return (
    <section className="create">
      <form id="login" onSubmit={onSubmit}>
        <div>
          <h1>Login</h1>
          <label htmlFor="username">Username:</label>
          <input type="username" id="username" name="username" value={setFormValues.username} onChange={handleChange} />
          <p style={{ fontSize: 12, color: "red" }}>{formErrors.username}</p>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={setFormValues.password} onChange={handleChange} />
          <p style={{ fontSize: 12, color: "red" }}>{formErrors.password}</p>
          <input type="submit" className="btn submit" defaultValue="Login" />
          <p style={{ fontSize: 12, color: "red" }}>{error}</p>
          <p>
            Need to register? - <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </section>
  );
}


// timeout(1000)

// function timeout( delay) {
//   return new Promise(res => setTimeout(res, delay));
// }
