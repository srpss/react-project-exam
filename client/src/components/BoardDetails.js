import { React, useEffect, useState, useContext } from 'react';

import { Context } from './context/Context';
import { deleteOne, getOne, getUser } from '../services/board';
import { useNavigate, useParams } from 'react-router-dom';




export default function BoardDetails() {
    let [board, setBoard] = useState();
    const { user } = useContext(Context)
    const [boardUser, setUser] = useState([])
   // let [description, setDescription] = useState([])

    let { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getOne(id).then(result => {
            setBoard(result);

         
        });
    }, [id])

    useEffect(() => {
        if(board?.owner){
            getUser(board.owner).then(res => setUser(res))
        }
     
    }, [board])


 

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
         // const descriptionUpdate = Object.fromEntries(new FormData(e.target));
        //  setDescription("!==!==!==!==!"+descriptionUpdate)
         
          console.log("it was changed successfully!")
          document.getElementById("description").reset();
        } catch (error) {
          console.log({error: error.message})
        }
      };

    function deleteExecute() {
        deleting(board._id)
    }
    const deleting = async (id) => {
        await deleteOne(id)
        navigate("/")
    }
   
    if (board && board.description) {
        //setDescription(JSON.parse(JSON.stringify(board.description)))

    }

    // <ul>
    // {description ? description.map(x => <li>x</li>) : ""}
    // </ul>

    return (
        <div className='boardCard'>
            {boardUser[0]?.username ? <div>Creator: {boardUser[0].username}</div> : <div>Loading...</div>}
            {board?   
            <div>
            <div  >ID: {board._id}</div>
            <div  >Last Update: {board.date}</div>
            {board.image !== "" ? <img src={board.image} alt="boardImg" width="150" height="150"></img> : ""}
            <div  >{board.originalPoster}</div>
            {board.owner === user.id ? <button onClick={deleteExecute}>Delete</button> : ""}
            </div>:""}
         
            {user.accessToken ?
                <section id="description" className="description">
                    <form id="description" onSubmit={onSubmit}>
                        <div className="container">
                        
                            <label htmlFor="comment">Comment:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                placeholder='Add new comment here'

                            ></input>
                            <input
                                className="btn submit"
                                type="submit"
                                value="description"
                            />
                        </div>
                    </form>
                </section> : ""}
        </div>
    )
}

