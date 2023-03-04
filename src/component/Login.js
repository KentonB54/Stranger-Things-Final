import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { config } from '../config'

const Login = (props) => {
const [name, setName] = useState('')
const [password, setPassword] = useState('')

const navigate = useNavigate()

const submit = async (e) => {
  e.preventDefault()
  try {
    const response = await fetch(          
        `${config.apiLink}/${config.cohort}/users/login`, {
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
          props.updateLoggedInName(name)
          props.loggedIn()
          props.currentToken(result.data.token)
          navigate('/Home')  
        } else {
          alert('try again with the correct accounts details')
        }
    } catch (err) {
        console.error(err);
    }
}


  return (
    <div className='login--background'>
    <div className='login--container'>
    <form onSubmit={submit} >
        <h1>login</h1>

        <input 
            type='text' 
            placeholder='username' 
            className='login--input'
            onChange={e => setName(e.target.value)}
            />

        <input 
            type='password' 
            placeholder='password' 
            className='login--input'
            onChange={e => setPassword(e.target.value)}
        />

        <button className='login--buttons' type='submit'>submit</button>
        
    </form>
    <button className='login--buttons'><Link to="/Register">Register</Link></button>
    </div>
    </div>
  )
}

export default Login