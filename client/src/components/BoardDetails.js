import { React, useEffect, useState, useContext } from 'react';

import { Context } from './context/Context';
import { deleteOne, getOne, getUser, updateDescription,editOne,deleteDesc } from '../services/board';
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
    function deleteDescr(id) {
        deletingDescr(id)
    }
    const deletingDescr = async (id) => {
        await deleteDesc(id)
        setStater(!stater)
      
    }

    const onEdit = async (e) => {
        e.preventDefault();

        try {
            const oUpdate = Object.fromEntries(new FormData(e.target));
            
            editOne(board._id, oUpdate)
            document.getElementById("edit").reset();
           
            
            setStater(!stater)
         
        } catch (error) {
            console.log({ error: error.message })
        }
    };


    return (
        <div className='boardCard'>
            {boardUser[0]?.username ? <div>Creator: {boardUser[0].username}</div> : <div>Loading...</div>}
            {board ?
                <div>
                    <div  >ID: {board._id}</div>
                    <div  >Last Update: {board.date}</div>
                    {board.image !==""? <img src={board.image} alt={board.image} width="150" height="150"></img> : ""}
                    <div  >{board.originalPoster}</div>
                    {board.owner === user.id ? <button onClick={deleteExecute}>Delete</button> : ""}
                    {board.owner === user.id ? <section className="edit">
                    <form id="edit" onSubmit={onEdit}>
                        <div className="container">

                            <label htmlFor="edit">Original Post:</label>
                            <input
                                type="text"
                                id="originalPoster"
                                name="originalPoster"
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
                                value="Edit"
                            />
                        </div>
                    </form>
                </section> : ""}
                    {description ?
                        <ul>
                            {description ? description.map(x => 
                            <li key={x._id}><p>{x.owner}</p>
                            {x?.image !==""?<img src={x?.image} alt="wrongLink" width="150" height="150"></img>: ""}
                               <p>{x?.comment}</p>{x.owner === user.username ?<button onClick ={() => {deleteDescr(x._id)}}>Delete</button>:""}</li>
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

