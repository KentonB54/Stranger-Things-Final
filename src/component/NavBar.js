import React from 'react'
import { NavLink } from 'react-router-dom'



const NavBar = (props) => {

const handleLogout = () => {
  props.logout();
  }

  return (
    <nav className='navContainer'>
      <h1 id='stranger--things--title'>Stranger Things</h1>
        <div className='nav--items'>
          <h1 className='nav--single--item'><NavLink to='/Home'>Home</NavLink></h1>

          {
          !props.isLoggedIn ? 
          '' : 
          <h1 className='nav--single--item'><NavLink to='/Profile' >Profile</NavLink></h1>
          }
          
          {
          !props.isLoggedIn ? 
          '' : 
          <h1 className='nav--single--item' id='nav--username'>Welcome, {props.loggedInName}!</h1>
          }

          {
          props.isLoggedIn ? 
          <h1 onClick={handleLogout}className='nav--single--item' id='nav--logout'><NavLink to='/'>Logout</NavLink></h1> : 
          <h1 className='nav--single--item' id='nav--login'><NavLink to='/Login'>Login/Register</NavLink></h1>
          }
        </div>
    </nav>
  )
}

export default NavBar