import {React,useState,useEffect} from 'react'

import * as boardService from '../services/board';
import Board from './Board';


export default function Catalog() {
 
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    
    boardService.getAll()
        .then(result => {
            
            setBoards(result);
        });
}, []);

  
  return (
    boards.map(b => <Board key={b._id} board ={b}></Board>
    )
    
  )
}
