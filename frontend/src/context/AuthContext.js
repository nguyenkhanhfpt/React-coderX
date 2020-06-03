import React, {useState} from 'react';
import axios from "axios";

export const AuthContext = React.createContext();

export function AuthProvider(props) {

    axios.post("http://localhost:3001/api/checkToken", {
        token: sessionStorage.getItem("token")
    })
    .then(res => {
        if(res.data.message === 'Authentication done!') {
            sessionStorage.setItem('isLogin', true);
        }
        else {
            sessionStorage.setItem('isLogin', false);
        }
    });


    const logined = sessionStorage.getItem('isLogin') === 'true' ? true : false || false;

    let [isLogin, setLogin] = useState(logined);

    let loginUser = (callback) => {
        return () => {
            setLogin(isLogin = true);
            setTimeout(callback, 10);
        }
    }

    let logoutUser = (callback) => {
        return () => {
            setLogin(isLogin = false);
            sessionStorage.removeItem('token');
            setTimeout(callback, 10);
        }
    }

    return (
        <AuthContext.Provider value={{
            isLogin: isLogin,
            loginUser : loginUser,
            logoutUser: logoutUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}