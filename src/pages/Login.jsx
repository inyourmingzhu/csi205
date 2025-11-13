import React from 'react'
import { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { verifyUser } from '../data/users';


function Login( { setToken , setRole} ) {

    const userRef = useRef ()
    const passRef = useRef ()

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <div style={{ textAlign: 'center', width: '200px' }} className='mt-3'>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                    type="text"
                    id="username"
                    aria-describedby="passwordHelpBlock"
                    placeholder="user"
                    style={{ textAlign: 'center' }}
                    ref={userRef}
                />
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    placeholder="pass"
                    style={{ textAlign: 'center' }}
                    ref={passRef}
                />
                <Button 
                variant="success" 
                className="mt-3" 
                onClick={ () => {
                    const user = userRef.current.value.trim()
                    const pass = passRef.current.value.trim()
                     //ตัดช่องว่างหน้าหลัง
                    userRef.current.value = ''
                    passRef.current.value = ''

                    const userInfo = verifyUser(user, pass)


                    if (userInfo === null) {
                        alert ('Wrong username or password') 
                        userRef.current.focus()
                    } else {
                        setToken(userInfo.token)
                        setRole(userInfo.role)
                    }

                }}>
                    Login
                </Button>
            </div>
        </div>

    )
}

export default Login