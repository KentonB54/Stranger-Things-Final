import React, { useState } from 'react'
import { config } from '../config';

const Postform = (props) => {

  const [willDeliver, setWillDeliver] = useState(false)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [showPopup, setShowPopup] = useState(false);





  const Popup = ({ showPopup }) => {
    return showPopup ? (
      <div>
        <p id="post--submitted">Post submitted!!!</p>
      </div>
    ) : null;
  };

  const postNewForm = async (e) => {
     e.preventDefault()

    try {
      const response = await fetch(`${config.apiLink}/${config.cohort}/posts`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        },
        body: JSON.stringify({ 
            post: {
              title: title,
              description: description,
              price: price,
              willDeliver: willDeliver,
              location: location,
            }
         })
      });
        const result = await response.json();
        console.log('newpost',result);
        if(!props.token) {
          alert('Login or Register to post')
          return;
        } 
        if (!title || !description || !price) {
          alert('Must contain a title, description and price')
        } else if (props.token) {
         const updatedPosts = [result.data.post,   ...props.posts]
         await props.setPosts(updatedPosts)
          setShowPopup(true)
          setTimeout(() => setShowPopup(false), 3000);
        }
    } catch (err) {
      console.error(err);
    }
}

  return (
    <>
    <form className='postForm--content--all' method='post' onSubmit={postNewForm}>
      <h4>Add a new post here</h4>
        <input 
              className='postForm--content'
              type='text' 
              placeholder='Title' 
              onChange={e => setTitle(e.target.value)}
              />
        <input 
              className='postForm--content'
              type='text' 
              placeholder='Description' 
              onChange={e => setDescription(e.target.value)}
              />
        <input 
              className='postForm--content'
              type='text' 
              placeholder='Price' 
              onChange={e => setPrice(e.target.value)}
              />
        <input 
              className='postForm--content'
              type='text' 
              placeholder='Location' 
              onChange={e => setLocation(e.target.value)}
              /> 
            <label className='postForm--label'>
        <span>Will deliver
          <input 
              className='postForm--content'
              type='checkbox' 
              checked={willDeliver}
              onChange={e => setWillDeliver(e.target.checked)}
              />
        </span>
        </label>
        <button id='postForm--button' type='submit'>Post</button>
    </form>
    <Popup showPopup={showPopup} />
    </>
  )
}

export default Postform