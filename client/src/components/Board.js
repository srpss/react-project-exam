import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';


export default function Board({board,  deleting}) {
    const {user} = useContext(Context)
    const navigate = useNavigate();

    const details = () => {
        navigate(`/boards/${board._id}`);
    }

  
    function deleteExecute (){
        deleting(board._id)
    } 
    
    return (
        <div  className='boardCard'>
            <div  >{board.originalPoster}</div>
            <div  >{board._id}</div>
            <button onClick={details}>Details</button>
            {board.owner===user.id?<button onClick={deleteExecute}>Delete</button>:""}
           
        </div>
    )
}
