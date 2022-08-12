import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

export default function Nav() {
    const { user } = useContext(Context)

    //navigation bar setup with conditions based on logged user or guest
    return (
        <div className='nav'>
            <ul className="nav">
                <li className="li"><Link to="/"> <NavLink exact activeClassName="active" to="/">
                    Catalog
                </NavLink></Link></li>
                {user?.accessToken ? <li className="li"><Link to="/my-boards"><NavLink exact activeClassName="active" to="/my-boards">
                    My Threads
                </NavLink></Link></li> : ""}
                {user?.accessToken ? <li className="li"><Link to="/create-new"><NavLink exact activeClassName="active" to="/create-new">
                    Create
                </NavLink></Link></li> : ""}
                {!user?.accessToken ? <li className="li"><Link to="/login"><NavLink exact activeClassName="active" to="/login">
                    Login
                </NavLink></Link></li> : ""}
                {!user?.accessToken ? <li className="li"><Link to="/register"><NavLink exact activeClassName="active" to="/register">
                    Register
                </NavLink></Link></li> : ""}
                {user?.accessToken ? <li className="li"><Link to="/profile"><NavLink exact activeClassName="active" to="/profile">
                    Profile
                </NavLink></Link></li> : ""}
                {user?.accessToken ? <li className="li"><Link to="/logout"><NavLink exact activeClassName="active" to="/logout">
                    Logout
                </NavLink></Link></li> : ""}
                {user?.accessToken ? <div><li className="li"><div className='navusername'>{user.username}</div> </li><li><img  className='navimage' src={user.image} alt="UserImg" width="60" height="60"></img></li></div> : ""}
            </ul>
        </div>
    )
}
