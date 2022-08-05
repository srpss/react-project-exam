import {React,useState,useEffect} from 'react'

import * as boardService from '../services/board';
import Board from './Board';


export default function MyComics() {
  const [boards, setBoards] = useState([]);
//neeed to give user id here
  useEffect(() => {
    
    boardService.getAll()
        .then(result => {
            
            setBoards(result);
        });
}, []);

  
  return (
    boards.map(b => <Board Board key={b._id} board ={b}></Board>
    )
    
  )
}
