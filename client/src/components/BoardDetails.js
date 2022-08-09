import { React, useEffect, useState, useContext } from 'react';

import { Context } from './context/Context';
import { deleteOne, getOne, getUser } from '../services/board';
import { useNavigate, useParams } from 'react-router-dom';




export default function BoardDetails() {
    let [board, setBoard] = useState({});
    const { user } = useContext(Context)
    const [boardUser, setUser] = useState([])
    let [description, setDescription] = useState([])

    let { id } = useParams();
    const navigate = useNavigate()
    
    useEffect(() => {
        getOne(id).then(result => {
            setBoard(result);
        });
    }, [id])

    useEffect(() => {
        getUser(board.owner).then(res => setUser(res))
    }, [board])


    function deleteExecute() {
        deleting(board._id)
    }

    const deleting = async (id) => {
        await deleteOne(id)
        navigate("/")
    }

console.log(board.description)
    return (
        <div className='boardCard' key={board._id}>
            {boardUser[0]?.username ? <div>Creator: {boardUser[0].username}</div> : <div>Loading...</div>}
            <div  >ID: {board._id}</div>
            <div  >Last Update: {board.date}</div>
            {board.image !== "" ? <img src={board.image} alt="boardImg" width="150" height="150"></img> : ""}
            <div  >{board.originalPoster}</div>
            {board.owner === user.id ? <button onClick={deleteExecute}>Delete</button> : ""}
            {board.description ? description.map(x => <div>x</div>) : ""
            }
        </div>
    )
}

