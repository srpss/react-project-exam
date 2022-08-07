import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {

  const navigate = useNavigate();
    const { user, userLogout } = useContext(AuthContext);

    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                userLogout();
                navigate('/');
            })
            .catch(() => {
                navigate('/');
            });
    });

    return null;
}
