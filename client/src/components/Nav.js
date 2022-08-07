import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

export default function Nav() {
    const user = useContext(Context)
  
    return (
<div className='nav'>
        <ul className="nav">
            <li className="li"><Link to ="/">Catalog</Link></li>
            {user?.user.accessToken?<li className="li"><Link to ="/my-board">My Comics</Link></li>:""}       
            {user?.user.accessToken?<li className="li"><Link to ="/create-new">Create</Link></li>:""} 
            {!user?.user.accessToken?<li className="li"><Link to ="/login">Login</Link></li>:""}
            {!user?.user.accessToken?<li className="li"><Link to ="/register">Register</Link></li>:""}   
            {user?.user.accessToken?<li className="li"><Link to ="/profile">Profile</Link></li>:""}            
            {user?.user.accessToken?<li className="li"><Link to ="/logout">Logout</Link></li>:""}
            {user?.user.accessToken?<li className="li"><div>{user.user.username}</div></li>:""}  
        </ul>
</div>
    )
}
