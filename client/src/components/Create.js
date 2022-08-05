import React from 'react'

export default function Create() {
  const onSubmit = (e) => {
    e.preventDefault();

    const boardData = Object.fromEntries(new FormData(e.target));

    console.log(boardData);


  };

  return (
    <section id="create-page" className="auth">
      <form id="create" onSubmit={onSubmit}>
        <div className="container">
          <h1>Create board thread</h1>
          <label htmlFor="leg-title">Board original post:</label>
          <input
            type="text"
            id="oTest"
            name="oTest"
            placeholder="How it will start"
          ></input>
          <label htmlFor="single-img">Image:</label>
          <input
            type="text"
            id="single-img"
            name="single-img"
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
