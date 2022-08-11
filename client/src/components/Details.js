import { React, useState, useEffect } from 'react'

import * as boardService from '../services/board';
import BoardDetails from './BoardDetails';
import { deleteOne } from '../services/board';
import { useParams, useNavigate } from 'react-router-dom';



export default function Details() {

  let [boards, setBoards] = useState({});
  let { id } = useParams();
  const navigate = useNavigate()


  useEffect(() => {
    boardService.getOne(id)
      .then(result => {

        setBoards(result);

      });

  }, [id]);

  if (boards?.error) {
    return (
      <div className="boards-do-not-exist">Does not exist</div>
    )
  }

  const deleting = async (_id) => {
    await deleteOne(_id)
    navigate(`/`);

  }
  return (
    <div>
      {

        boards
          ? <BoardDetails key={boards._id} board={boards} deleting={deleting}></BoardDetails>
          : <div className="boards-do-not-exist">Does not exist</div>
      }
    </div>
  )
}
