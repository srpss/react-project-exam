import React from 'react'

import { useNavigate } from 'react-router-dom';


export default function Board({board,  deleting}) {
    
    const navigate = useNavigate();

    const details = () => {
        navigate(`/boards/${board._id}`);
    }

    const edit= () => {
        navigate(`/boards/edit/${board._id}`);

    }
    function deleteExecute (){
        deleting(board._id)
    } 
    
    return (
        <div  className='boardCard'>
            <div  >{board.originalPoster}</div>
            <div  >{board._id}</div>
            <button onClick={details}>Details</button>
            <button onClick={edit}>Edit</button>
            <button onClick={deleteExecute}>Delete</button>
        </div>
    )
}
