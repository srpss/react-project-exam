
//import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './components/hooks/useLocalStorage';
import { Context } from './components/context/Context';
import './css/global.css';
import './css/catalogs.css'

import NotFound from './components/NotFound';
import Catalog from './components/Catalog';
import Create from './components/Create';
import Login from './components/Login';
import Logout from './components/Logout';
import BoardDetails from './components/BoardDetails';
import MyComics from './components/MyComics';
import Nav from './components/Nav';
import Register from './components/Register';
import Profile from './components/Profile';
import RedirectHome from './components/RedirectHome';




function App() {

  const [auth, setAuth] = useLocalStorage('user', {});

  const userLogin = (authData) => {
    setAuth(authData);
  };

 
  const userLogout = () => {
    setAuth({});
  };
  return (
    <Context.Provider value={{ user: auth, userLogin, userLogout }}>
      <div className="main">
        <Nav />
        <Routes >
          <Route path="/" element={<Catalog />} />
          <Route path="/boards/:id" element={<BoardDetails />} />
          {auth.accessToken ? <Route path="/my-boards" element={<MyComics />} /> : <Route path="/not-found" element={<NotFound />} />}
          {auth.accessToken ? <Route path="/create-new" element={<Create />} /> : <Route path="/not-found" element={<NotFound />} />}
          {!auth.accessToken ? <Route path="/login" element={<Login />} /> : <Route path="/" element={<RedirectHome />} />}
          {!auth.accessToken ? <Route path="/register" element={<Register />} /> : <Route path="/" element={<RedirectHome />} />}

          {auth.accessToken ? <Route path="/logout" element={<Logout />} /> : <Route path="/not-found" element={<NotFound />} />}
          {auth.accessToken ?   <Route path="/profile" element={<Profile />} /> : <Route path="/not-found" element={<NotFound />} />}
        
          <Route path="*" element={<RedirectHome />} />
        </Routes>

      </div>
    </Context.Provider>
  );
}

export default App;


