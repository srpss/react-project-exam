import Catalog from "./components/Catalog";
import NavScrollExample from "./components/Nav";
import { Route, Routes } from "react-router-dom"
function App() {
  return (
    <>
    <NavScrollExample/>
    <Routes>
    <div className="main">
    <Route path="/start" element={<Catalog />} />
    
    </div>
      
    </Routes>
      
     
    </>
  );
}

export default App;
