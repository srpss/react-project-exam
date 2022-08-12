import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

export default function Nav() {
    const { user } = useContext(Context)

    //navigation bar setup with conditions based on logged user or guest
    return (
        <div className='nav'>
            <ul className="nav">
                <li className="li"><Link to="/"> <NavLink  activeclassname="active" to="/">
                    Catalog
                </NavLink></Link></li>
                {user?.accessToken ? <li className="li"><Link to="/my-boards"><NavLink  activeclassname="active" to="/my-boards">
                    My Threads
                </NavLink></Link></li> : ""}
                {user?.accessToken ? <li className="li"><Link to="/create-new"><NavLink  activeclassname="active" to="/create-new">
                    Create
                </NavLink></Link></li> : ""}
                {!user?.accessToken ? <li className="li"><Link to="/login"><NavLink  activeclassname="active" to="/login">
                    Login
                </NavLink></Link></li> : ""}
                {!user?.accessToken ? <li className="li"><Link to="/register"><NavLink  activeclassname="active" to="/register">
                    Register
                </NavLink></Link></li> : ""}
                {user?.accessToken ? <li className="li"><Link to="/profile"><NavLink  activeclassname="active" to="/profile">
                    Profile
                </NavLink></Link></li> : ""}
                {user?.accessToken ? <li className="li"><Link to="/logout"><NavLink  activeclassname="active" to="/logout">
                    Logout
                </NavLink></Link></li> : ""}
                {user?.accessToken ? <div><li className="li"><div className='navusername'>{user.username}</div> </li><li><img  className='navimage' src={user.image} alt="UserImg" width="60" height="60"></img></li></div> : ""}
            </ul>
        </div>
    )
}
