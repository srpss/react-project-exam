import { Link } from 'react-router-dom';

export default function Nav() {
    return (
<div className='nav'>
        <ul className="nav">
            <li className="li"><Link to ="/">Catalog</Link></li>
            <li className="li"><Link to ="/requirements">Requirements</Link></li>
            <li className="li"><Link to ="/dashboard">Dashboard</Link></li>
        </ul>
</div>
    )
}
