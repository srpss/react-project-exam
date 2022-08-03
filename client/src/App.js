
import { Routes ,Route} from 'react-router-dom';
import Catalog from './components/Catalog';
import Create from './components/Create';
// import Details from './components/Details';
import MyComics from './components/MyComics';
import Nav from './components/Nav';

import './style.css';

function App() {
  return (
 
 <div className="main">
   <Nav />
   <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/my-comics" element={<MyComics />}/>
      <Route path="/create" element={<Create />}/>
    </Routes>
    
 </div>

  );
}

export default App;
{/* <Route path="/create" element={<Create />}/>
<Route path="/details/:id" element={<Details/>}/>
      <Route path="/edit/:id" element={<Details/>}/> */}