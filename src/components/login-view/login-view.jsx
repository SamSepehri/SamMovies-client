import React, { useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


// Create LoginView as function component using Hooks
export function LoginView(props) {
    // Call useState method from React to initialize login variables with an empty value
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Create hook for username and password error
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    // Create validation function for username & password
    const validate = () => {
        let isReq = true;

        if (!username) {
            setUsernameErr('Username is required!');
            isReq = false;
        } else if (username.length < 3) {
            setUsernameErr('Username must be at least 3 characters long');
            isReq = false;
        }

        if (!password) {
            setPasswordErr('Password is required!');
            isReq = false;
        }

        return isReq;
    }

    // Sending request to server for authentication
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent default submit button behaviour, i.e., don't reload the page

        const isReq = validate();

        if (isReq) {

            /* Send a request to the server for authentication */
            /* then call this.props.onLoggedIn(username) */
            axios.post('https://samcinema2022.herokuapp.com/login', {
                Username: username,
                Password: password
            })
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch(e => {
                    console.log('no such user')
                });
        }
    }

    // Return a login form where users can submit their username and password
    // Listening to changes on input and then updating the respective states

    return (
        <>
            <h1>Login</h1>
            <Form className="mb-3">
                <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                    {usernameErr && <p className="font-italic">{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                    {passwordErr && <p className="font-italic">{passwordErr}</p>}
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Login
                </Button>
            </Form>
            <p>
                New at Sam movies?{'    '}
                <Link to={`/register`}>
                    <Button variant="link">Register Now!</Button>
                </Link>
            </p>
        </>
    );

}

LoginView.propTypes = {
    onLoggedIn: propTypes.func.isRequired
};