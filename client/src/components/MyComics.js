import {React,useState,useEffect} from 'react'
import { useContext } from 'react';
import { Context } from './context/Context';

import * as boardService from '../services/board';
import Board from './Board';
import { deleteOne } from '../services/board';


export default function MyComics() {
  const [boards, setBoards] = useState([]);
  
  const { user } = useContext(Context);
  const id = user.id
  
  useEffect(() => {
 
    boardService.getMy(id)
        .then(result => {
            
            setBoards(result);
        });
}, [id]);

const deleting= async (id) => {
  await deleteOne(id)
  let newboards= boards.filter(x => !(x._id === id))

  setBoards(newboards) 
}
  return (
    <ul>
    {boards.sort((a,b) => (b.date > a.date) ? 1 : -1).map(b => <Board Board key={b._id} board ={b} deleting={deleting}></Board>)}
    </ul>
  )
}
