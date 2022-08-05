import { React, useState, useEffect } from 'react'

import * as boardService from '../services/board';
import Board from './Board';
import { deleteOne } from '../services/board';


export default function Catalog() {

  let [boards, setBoards] = useState([]);

  useEffect(() => {

    boardService.getAll()
      .then(result => {

        setBoards(result);
      });
  }, []);

  const deleting= async (id) => {
    await deleteOne(id)
    let newboards= boards.filter(x => !(x._id === id))
  
    setBoards(newboards) 
}
  return (
    <>
      {
        boards.length > 0
          ? boards.map(b => <Board key={b._id} board={b} deleting={deleting}></Board>)
          : <div className="boards-do-not-exist">Create new boards</div>
      }
    </>
  )
}
