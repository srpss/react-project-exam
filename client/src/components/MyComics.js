import {React,useState,useEffect} from 'react'
import { useContext } from 'react';
import { Context } from './context/Context';

import * as boardService from '../services/board';
import Board from './Board';


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

  
  return (
    boards.map(b => <Board Board key={b._id} board ={b}></Board>
    )
    
  )
}
