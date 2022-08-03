
import { Routes ,Route} from 'react-router-dom';
import Catalog from './components/Catalog';
import Nav from './components/Nav';

import './style.css';

function App() {
  return (
 
 <div className="main">
   <Nav></Nav>
   <Routes>
      <Route path="/" element={<Catalog />} />
    </Routes>
 </div>
  );
}

export default App;
