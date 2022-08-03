
import { Routes ,Route} from 'react-router-dom';
import Catalog from './components/Catalog';
import Create from './components/Create';
import Login from './components/Login';
import Logout from './components/Logout';

import MyComics from './components/MyComics';
import Nav from './components/Nav';
import Register from './components/Register';

import './style.css';

function App() {
  return (
 
 <div className="main">
   <Nav />
   <Routes>
      <Route path="/" element={<Catalog />} />
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
