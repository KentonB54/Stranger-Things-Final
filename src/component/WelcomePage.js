import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
  return (
    <div className='welcome--container'>
    <div className='welcome--text'>
        THIS PAGE IS STILL IN DEVELOPMENT
    </div>
    <button className='welcome--buttons'><Link to="/Home">See the Home page here</Link></button>
    <button className='welcome--buttons'><Link to="/Login">Login Here</Link></button>
    <button className='welcome--buttons'><Link to="/Register">Sign up Here</Link></button>
    </div>
  )
}

export default WelcomePage