
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './context/Context';

export default function Logout() {

    const navigate = useNavigate();
    const { user, userLogout } = useContext(Context);

    useEffect(() => {
        userLogout();
        navigate('/');
    },[])

    return null;
}

