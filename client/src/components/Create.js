import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

import * as boardService from '../services/board';


export default function Create() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const id = user.id
  const onSubmit = async (e) => {
    e.preventDefault();

    const boardData = Object.fromEntries(new FormData(e.target));
    boardData.owner = id
    boardData.date = new Date();
    boardData.description = [];
    try {
      const id = await boardService.create(boardData)
      

      navigate(`/boards/${id}`);
    } catch (error) {
      console.log({error:error.message})
    }
  };

  return (
    <section id="create-page" className="create">
      <form id="create" onSubmit={onSubmit}>
        <div className="container">
          <h1>Create board thread</h1>
          <label htmlFor="originalPoster">First post:</label>
          <input
            type="text"
            id="originalPoster"
            name="originalPoster"
            placeholder="How it will start"
          ></input>
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
            value="Create Game"
          />
        </div>
      </form>
    </section>
  );

}
