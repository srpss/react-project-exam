import { React, useState, useEffect } from 'react'

import * as boardService from '../services/board';
import Board from './Board';
import { deleteOne } from '../services/board';
import { useParams } from 'react-router-dom';


export default function Details() {

  let [boards, setBoards] = useState({});
  let { id } = useParams();

  useEffect(() => {
    boardService.getOne(id)
    .then(result => {
    
      setBoards(result);
      
    });
   
  }, [id]);

if(boards?.error){
  return(
    <div className="boards-do-not-exist">Does not exist</div>
  )
}
 
  const deleting= async (_id) => {
    await deleteOne(_id)
    let newboards= boards.filter(x => !(x._id === _id))
  
    setBoards(newboards) 
    
}
  return (
    <div>
      {
        
        boards
          ? <Board key={boards._id} board={boards} deleting={deleting}></Board>
          : <div className="boards-do-not-exist">Does not exist</div>
      }
    </div>
  )
}
