import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

export default function Nav() {
    const {user} = useContext(Context)
  
    return (
<div className='nav'>
        <ul className="nav">
            <li className="li"><Link to ="/">Catalog</Link></li>
            {user?.accessToken?<li className="li"><Link to ="/my-boards">My Boards</Link></li>:""}       
            {user?.accessToken?<li className="li"><Link to ="/create-new">Create</Link></li>:""} 
            {!user?.accessToken?<li className="li"><Link to ="/login">Login</Link></li>:""}
            {!user?.accessToken?<li className="li"><Link to ="/register">Register</Link></li>:""}   
            {user?.accessToken?<li className="li"><Link to ="/profile">Profile</Link></li>:""}            
            {user?.accessToken?<li className="li"><Link to ="/logout">Logout</Link></li>:""}
            {user?.accessToken?<div><li className="li"><div className='navUsername'>{user.username}</div> </li><li><img src={user.image} alt="UserImg" width="45" height="45"></img></li></div>:""}  
        </ul>
</div>
    )
}
