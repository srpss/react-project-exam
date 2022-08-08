
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './context/Context';

export default function Logout() {
    
    const navigate = useNavigate();
    const { userLogout } = useContext(Context);

   
    useEffect(() => { 
        userLogout();
        navigate('/');
    },[userLogout,navigate])

    return null;
}

