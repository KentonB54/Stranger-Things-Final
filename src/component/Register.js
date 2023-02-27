import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { config } from '../config'



const Register = (props) => {
    console.log('here', props.user)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch(          
            `${config.apiLink}/${config.cohort}/users/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username: name,
                        password: password
                    }
                })
            });
            const result = await response.json();
            console.log(result)
            if (result.success) {
            props.updateLoggedInName(name);
            props.loggedIn()
            props.currentToken(result.data.token)
              navigate('/Home')  
            } else {
                alert('you suck try again with an acc that hasnt already been created')
            }
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div className='register--container'>
    <form onSubmit={submit}>
        <h1>Sign up here</h1>

        <input 
            type='text' 
            placeholder='username' 
            className='login--input'
            onChange={e => setName(e.target.value)}
            />

        <input 
            type='text' 
            placeholder='password' 
            className='login--input'
            minLength={8}
            onChange={e => setPassword(e.target.value)}
        />

        <button className='login--buttons' type='submit'>submit</button>
    </form>
    <button className='login--buttons'><Link to="/Login">Back to Login</Link></button>
    </div>


)
}

export default Register