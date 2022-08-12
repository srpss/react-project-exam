import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Context } from './context/Context';

import * as boardService from '../services/board';


export default function Create() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const id = user.id

  const [formValues, setFormValues] = useState({ originalPoster: "", image: "" })
  const [formErrors, setFormErrors] = useState({})
  const [error, setError] = useState()
  let veri = ""

  const onSubmit = async (e) => {
    e.preventDefault();

    validate(formValues)
 
    if (Object.keys(veri).length !== 0) {

      return
    }
    const boardData = Object.fromEntries(new FormData(e.target));
    boardData.owner = id
    boardData.date = new Date();
    boardData.description = [];

    let check = (boardData.image.slice(0, 8) === 'https://')
    let check2 = (boardData.image.slice(0, 7) === 'http://')
   
    if (check === false && check2 === false) {
      boardData.image = ""
    }

    try {
      const id = await boardService.create(boardData)
      if (id.error) {
        setError(id.error)
        return
      }

      navigate(`/boards/${id}`);
    } catch (error) {
      console.log({error:error.message})
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })

  }
  //validaiton functions, it only requires something to be added into the fields. it cannot be empty
  const validate = (values) => {
    const errors = {}
    if (!values?.originalPoster) {
      errors.originalPoster = "First post is required!"
    }
  
    veri = errors
    setFormErrors(errors)

  }

  return (
    <section id="create-page" className="create">
      <form id="create" onSubmit={onSubmit}>
        <div className="container">
          <h1>Create board thread</h1>
          <label htmlFor="originalPoster">First post:</label>
          <textarea rows="4" cols="50"
            type="text"
            id="originalPoster"
            name="originalPoster"
            placeholder="How it will start"
            value={setFormValues.originalPoster} onChange={handleChange}
          ></textarea>
            <p style={{ fontSize: 12, color: "red" }}>{formErrors.originalPoster}</p>

          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Image URL https:/...png"
       
          />
          <input
            className="btn submit"
            type="submit"
            value="Create Thread"
          />
           <p style={{ fontSize: 12, color: "red" }}>{error}</p>
        </div>
      </form>
    </section>
  );

}
