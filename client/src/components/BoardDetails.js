import { React, useEffect, useState, useContext } from 'react';

import { Context } from './context/Context';
import { deleteOne, getOne, getUser, updateDescription } from '../services/board';
import { useNavigate, useParams } from 'react-router-dom';




export default function BoardDetails() {
    let [board, setBoard] = useState();
    const { user } = useContext(Context)
    const [boardUser, setUser] = useState([])
    let [description, setDescription] = useState([])
    const [stater, setStater] = useState(false)
    let { id } = useParams();
  
    const navigate = useNavigate()

    useEffect(() => {
        getOne(id).then(result => {
            setBoard(result);

            setDescription(result.description)
        });
    }, [id,stater])

    useEffect(() => {
        if (board?.owner) {
            getUser(board.owner).then(res => setUser(res))
        }

    }, [board])





    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const descriptionUpdate = Object.fromEntries(new FormData(e.target));
            descriptionUpdate.owner = user.username
            
            updateDescription(board._id, descriptionUpdate)
            document.getElementById("description").reset();
           
            
            setStater(!stater)
         
        } catch (error) {
            console.log({ error: error.message })
        }
    };

    function deleteExecute() {
        deleting(board._id)
    }
    const deleting = async (id) => {
        await deleteOne(id)
        navigate("/")
    }





    return (
        <div className='boardCard'>
            {boardUser[0]?.username ? <div>Creator: {boardUser[0].username}</div> : <div>Loading...</div>}
            {board ?
                <div>
                    <div  >ID: {board._id}</div>
                    <div  >Last Update: {board.date}</div>
                    {board.image !== "" ? <img src={board.image} alt={board.image} width="150" height="150"></img> : ""}
                    <div  >{board.originalPoster}</div>
                    {board.owner === user.id ? <button onClick={deleteExecute}>Delete</button> : ""}
                    {description ?
                        <ul>
                            {description ? description.map(x => 
                            <li key={x._id}><p>{x.owner}</p>
                            <img src={x?.image} alt="boardImg" width="150" height="150">
                                </img><p>{x?.comment}</p></li>
                            ) : ""}
                         </ul>: ""} </div> : ""}

            {user.accessToken ?
                <section className="description">
                    <form id="description" onSubmit={onSubmit}>
                        <div className="container">

                            <label htmlFor="comment">Comment:</label>
                            <input
                                type="text"
                                id="comment"
                                name="comment"
                                placeholder='Add new comment here'

                            ></input>
                             <label htmlFor="image">Image Link:</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                placeholder='Add image link here'

                            ></input>
                            <input
                                className="btn submit"
                                type="submit"
                                value="Submit"
                            />
                        </div>
                    </form>
                </section> : ""}
        </div>
    )
}

