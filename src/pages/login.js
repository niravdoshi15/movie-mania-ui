import React, { useState } from 'react';
import axios from 'axios'
import { MovieContext } from '../store'
import { useHistory } from 'react-router'
import './login.css'

export default () => {
    const history = useHistory()
    const { setValue } = React.useContext(MovieContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleClick = (e) => {
        const url = process.env.SERVICE_URL || 'http://localhost:3030'
        const cred = {
            username,
            password
        }
        axios.post(`${url}/api/users/login`, cred)
            .then((result) => {
                if (result.data.loginSuccess) {
                    localStorage.setItem('token', result.data.token)
                    setValue('IsLogin', result.data.token)
                    history.push('./')
                }
                else {
                    alert('Invalid Username and Password')
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <p><input type="text" name="username" value={username} placeholder='Username' onChange={handleUsernameChange} /></p>
            <p><input type="password" name="password" value={password} placeholder='Password' onChange={handlePasswordChange} /></p>
            <p className='submit'><button className='btn btn-primary' onClick={handleClick}>Log In</button></p>
        </div>
    )
}