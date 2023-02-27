import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import  {getAllPosts} from './api'

import { 
  Home, 
  Login, 
  NavBar, 
  Profile, 
  WelcomePage, 
  Register,
} from './component'


function App() {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInName, setLoggedInName] = useState('');
    const [token, setToken] = useState('')

    useEffect(() => {
      const fetchPosts = async () => {
        const {data} = await getAllPosts()
        setPosts(data.posts)
    }
      fetchPosts();
    }, [])


    const updateLoggedInName = (name) => {
      setLoggedInName(name);
    };

    const loggedIn = () => {
      setIsLoggedIn(true)
    }

    const logout = () => {
      setIsLoggedIn(false);
      setToken('')
    };

    const currentToken = (token) => {
      setToken(token)
    }

  return (
    <Router>
    <NavBar loggedInName={loggedInName} logout={logout} isLoggedIn={isLoggedIn}/>
    <div className='page--content'>
        <Routes>
          <Route path='/Home' element={<Home posts={posts} setPosts={setPosts} loggedInName={loggedInName} token={token} isLoggedIn={isLoggedIn}/>}/>
          <Route path='/' element={<WelcomePage/>}/>
          <Route path='/Login' element={<Login updateLoggedInName={updateLoggedInName} loggedIn={loggedIn} currentToken={currentToken}/>}/>
          <Route path='/Profile' element={<Profile />}/>
          <Route path='/Register' element={<Register updateLoggedInName={updateLoggedInName} loggedIn={loggedIn} currentToken={currentToken}/>}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;


