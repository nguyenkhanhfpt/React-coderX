import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';


export default function PublicRouter({ children }) {
    let loginContext = useContext(AuthContext);

    return (
        <Route render={({ location }) => 
            loginContext.isLogin === false ? children :
            <Redirect to={{
                pathname: '/'
            }} />
        } />
    )
}