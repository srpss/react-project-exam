
//import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './components/hooks/useLocalStorage';
import { Context } from './components/context/Context';
import './style.css';

import NotFound from './components/NotFound';
import Catalog from './components/Catalog';
import Create from './components/Create';
import Login from './components/Login';
import Logout from './components/Logout';
import Details from './components/Details';
import MyComics from './components/MyComics';
import Nav from './components/Nav';
import Register from './components/Register';
import Profile from './components/Profile';
import RedirectHome from './components/RedirectHome';




function App() {

  const [auth, setAuth] = useLocalStorage('auth', {});

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
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/boards/:id" element={<Details />} />
          {auth.accessToken ? <Route path="/my-board" element={<MyComics />} /> : <Route path="/not-found" element={<NotFound />} />}
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


