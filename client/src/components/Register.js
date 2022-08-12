import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Context } from './context/Context';
import { useContext, useState } from 'react';
import * as boardService from '../services/board';


export default function Register() {
  const navigate = useNavigate();
  const { userLogin } = useContext(Context);

  const [formValues, setFormValues] = useState({ username: "", password: "" })
  const [formErrors, setFormErrors] = useState({})
  const [error, setError] = useState()
  let veri = ""

  const onSubmit = async (e) => {
    e.preventDefault();

    validate(formValues)



    const registerData = Object.fromEntries(new FormData(e.target));

    try {
      if (Object.keys(veri).length !== 0) {

        return
      }

      const regRes = await boardService.register(registerData)
 
      if (regRes.error) {
        setError(regRes.error)
        return
      }
      const userData = await boardService.login(registerData)
      userLogin(userData)
      navigate(`/`);

    } catch (error) {
      console.log({ error: error.message })
    }
  }
  //settinig values while they change from user input
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })

  }
  //validaiton functions, it only requires something to be added into the fields. it cannot be empty
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
      <form id="register" onSubmit={onSubmit}>
        <div>
          <h1>Register</h1>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            value={setFormValues.username} onChange={handleChange}
          />
          <p style={{ fontSize: 12, color: "red" }}>{formErrors.username}</p>

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={setFormValues.password} onChange={handleChange} />
          <p style={{ fontSize: 12, color: "red" }}>{formErrors.password}</p>
          <input type="submit" className="btn submit" defaultValue="Login" />
          <p style={{ fontSize: 12, color: "red" }}>{error}</p>
          <p>
            Already have an account? - <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </section>
  );
}


