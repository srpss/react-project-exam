
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './context/Context';

export default function Logout() {
    
    const navigate = useNavigate();
    const { userLogout } = useContext(Context);

   //triggering logout which basically removes user localstorage data
    useEffect(() => { 
        userLogout();
        navigate('/');
    },[userLogout,navigate])

    return null;
}

