import React from 'react'
import * as boardService from '../services/board';

export default function Create() {
  const onSubmit = (e) => {
    e.preventDefault();

    const boardData = Object.fromEntries(new FormData(e.target));
    boardData.owner = "test"
    boardData.date = new Date();
    boardService.create(boardData)


  };

  return (
    <section id="create-page" className="auth">
      <form id="create" onSubmit={onSubmit}>
        <div className="container">
          <h1>Create board thread</h1>
          <label htmlFor="originalPoster">Board original post:</label>
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
