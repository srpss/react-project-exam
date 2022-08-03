import { Link } from 'react-router-dom';

export default function Nav() {
    return (
<div className='nav'>
        <ul className="nav">
            <li className="li"><Link to ="/">Catalog</Link></li>
            <li className="li"><Link to ="/my-comics">My Comics</Link></li>
            <li className="li"><Link to ="/create">Create</Link></li>
        </ul>
</div>
    )
}
