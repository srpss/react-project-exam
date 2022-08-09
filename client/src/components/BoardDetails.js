import { React, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './context/Context';
import { getUser } from '../services/board';



export default function Board({ board, deleting }) {
    const { user } = useContext(Context)
    const navigate = useNavigate();
    const [boardUser, setUser] = useState([])
    const details = () => {
        navigate(`/boards/${board._id}`);
    }
    useEffect(() => {
        getUser(board.owner).then(res => setUser(res))
    }, [])

    function deleteExecute() {
        deleting(board._id)
    }
   

    return (
        <div className='boardCard'>
            {boardUser[0]?.username?<div>Creator: {boardUser[0].username}</div>:<div>Loading...</div>}
            <div  >ID: {board._id}</div>
            <div  >Last Update: {board.date}</div>
            {board.image !== ""?<img src={board.image} alt="boardImg" width="150" height="150"></img>:""}
            <div  >{board.originalPoster}</div>           
            {board.owner === user.id ? <button onClick={deleteExecute}>Delete</button> : ""}
            ==================================================================================
        </div>
    )
}
