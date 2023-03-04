import React, { useState, useEffect } from 'react'
import { config } from '../config';
import { useLocation } from 'react-router-dom';

const Profile = (props) => {

    const [message, setMessage] = useState('')
    const location = useLocation();

    const [displayMessages, setDisplayMessages] = useState([])

  const postId = new URLSearchParams(location.search).get('post_id');


    const postMessage = async (e) => {
        e.preventDefault()
        try {
          const response = await fetch(`${config.apiLink}/${config.cohort}/posts/${postId}/messages`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${props.token}`
            },
            body: JSON.stringify({
              message: {
                content: message
              }
            })
          });
          const result = await response.json();
          console.log(result);
          if (result.success) {
            setMessage(message)
          }
        } catch (err) {
          console.error(err);
        }
      }


      useEffect(() => {
        const fetchMessages = async () => {
          try {
            const response = await fetch(`${config.apiLink}/${config.cohort}/users/me`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
              },
            });
            const result = await response.json();
            setDisplayMessages(result.data.messages);
            console.log('lookie here', displayMessages)

            
          } catch (err) {
            console.error(err);
          }
        }
        fetchMessages();
      }, [props.token, displayMessages]);


    
      const newMessages = displayMessages.map(message => {
        return (
          <div className='messages-flex'>
                     <h1 className='post--info'>Post title: <span className='title--span'>{message.post.title}</span></h1>
            <h1 className='post--info'>From: <span className='user--span'>{message.fromUser.username}</span></h1>
            <h1 className='post--info'>To: <span className='author--span'>{message.post.author.username}</span></h1>
            <h1 className='post--info'>Message description: <span className='message--span'>{message.content}</span></h1>
            </div>
        )
      })

      
    return (
      <div className='message--page--container'>
        <form className='message--container' method='post' onSubmit={postMessage}>
          <h3 className='welcome--profile'>Welcome to your profile, <br></br>send messages by clicking send message on posts in home</h3>
          <h1 className='logged--in--as'>Logged in as: <span className='profile--username'>{props.loggedInName}</span></h1>
          <h1>Send message</h1>
          <textarea
          type='text' 
          placeholder='message' 
          className='message--input' 
          id='message--pass--input'
          onChange={e => setMessage(e.target.value)}
          />
          <button className='message--send--button' type='submit'>send</button>
      </form>
        <div className='messages-flex'>
          <div>{newMessages}</div>
        </div>
      </div>
      )
}

export default Profile