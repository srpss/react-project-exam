import { Link } from 'react-router-dom';

export default function Nav() {
    return (
<div className='nav'>
        <ul className="nav">
            <li className="li"><Link to ="/">Catalog</Link></li>
            <li className="li"><Link to ="/my-board">My Comics</Link></li>
            <li className="li"><Link to ="/create-new">Create</Link></li>
            <li className="li"><Link to ="/login">Login</Link></li>
            <li className="li"><Link to ="/register">Register</Link></li>
            <li className="li"><Link to ="/logout">Logout</Link></li>
        </ul>
</div>
    )
}
