import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';


export default function PrivateRouter({ children }) {
    let loginContext = useContext(AuthContext);

    return (
        <Route render={({ location }) => 
            loginContext.isLogin ? children :
            <Redirect to={{
                pathname: '/login',
                state: { from: location }
            }} />
        } />
    )
}