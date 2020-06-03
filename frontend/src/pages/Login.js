import React, { useContext, useReducer, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { AuthContext } from '../context/AuthContext';

export default function Login() {
    let [err, setErr] = useState('');
    let loginContext = useContext(AuthContext);
    let history = useHistory();
    let location = useLocation();

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: '',
            password: '',
        }
    );

    let { from } = location.state || { from: { pathname: '/' } };

    const changeInput = (event) => {
        const name = event.target.name;
        const newValue = event.target.value;
        setUserInput({ [name]: newValue });
    }

    const submitState = async () => {
        const response = await axios.post('http://localhost:3001/api/user', {
            userName: userInput.name,
            password: userInput.password
        });
        
        if(response.data.message === 'User is not exist!') {
            setErr(err = 'User is not exist!');
        }

        if(response.data.message === 'Password is wrong!') {
            setErr(err = 'Password is wrong!');
        }

        if(response.data.message === 'Authentication done!') {
            sessionStorage.setItem('token', response.data.token);
            loginContext.loginUser(() => history.replace(from))();
        }  
    }

    return (
        <div className="mt-4">
            <Container>
                <h2 className="text-center">Login</h2>

                <Form style={{
                    maxWidth: '500px',
                    margin: '20px auto'
                }}>
                    {err && <div className="alert alert-danger">{err}</div>}

                    <FormGroup>
                        <Label for="name">User name</Label>
                        <Input type="text" name="name"
                            value={userInput.name} onChange={changeInput}
                            id="name" placeholder="admin" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password"
                            value={userInput.password} onChange={changeInput}
                            id="password" placeholder="123123" />
                    </FormGroup>
                    <Button onClick={submitState}>Submit</Button>
                </Form>

            </Container>
        </div>
    )
}