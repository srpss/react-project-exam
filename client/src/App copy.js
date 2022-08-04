
import { useState, useEffect } from 'react';
import { Routes ,Route} from 'react-router-dom';
import * as boardService from './services/board';
import Catalog from './components/Catalog';
import Create from './components/Create';
import Login from './components/Login';
import Logout from './components/Logout';
import MyComics from './components/MyComics';
import Nav from './components/Nav';
import Register from './components/Register';

import './style.css';

function App() {

  
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    
    boardService.getAll()
        .then(result => {
            
            setBoards(result);
        });
}, []);

  return (
 
 <div className="main">
   <Nav />
   <Routes>
      <Route path="/" element={<Catalog boards = {boards}/>} />
      <Route path="/my-board" element={<MyComics />}/>
      <Route path="/create-new" element={<Create />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/logout" element={<Logout />}/>
    </Routes>
    
 </div>

  );
}

export default App;
