import {  NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

export default function Nav() {
    const { user } = useContext(Context)

    //navigation bar setup with conditions based on logged user or guest
    return (
        <div className='nav'>
            <ul className="nav">
                <li className="li"> <NavLink  activeclassname="active" to="/">
                    Catalog
                </NavLink></li>
                {user?.accessToken ? <li className="li"><NavLink  activeclassname="active" to="/my-boards">
                    My Threads
                </NavLink></li> : ""}
                {user?.accessToken ? <li className="li"><NavLink  activeclassname="active" to="/create-new">
                    Create
                </NavLink></li> : ""}
                {!user?.accessToken ? <li className="li"><NavLink  activeclassname="active" to="/login">
                    Login
                </NavLink></li> : ""}
                {!user?.accessToken ? <li className="li"><NavLink  activeclassname="active" to="/register">
                    Register
                </NavLink></li> : ""}
                {user?.accessToken ? <li className="li"><NavLink  activeclassname="active" to="/profile">
                    Profile
                </NavLink></li> : ""}
                {user?.accessToken ? <li className="li"><NavLink  activeclassname="active" to="/logout">
                    Logout
                </NavLink></li> : ""}
                {user?.accessToken ? <div><li className="li"><div className='navusername'>{user.username}</div> </li><li><img  className='navimage' src={user.image} alt="UserImg" width="45" height="45"></img></li></div> : ""}
            </ul>
        </div>
    )
}
