import React, { useState } from 'react'
import Postform from './Postform'
import { config } from '../config'

const Home = (props) => {
 
  const {posts} = props
  console.log(posts)
  
   

  const deletePost = async (deletedpost) => {
   
      try {
        const response = await fetch(`${config.apiLink}/${config.cohort}/posts/${deletedpost}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
          }
        })
        const result = await response.json();
        console.log(result);
        if (result) {
          const newPosts = posts.filter((post) => post._id !== deletedpost);
          props.setPosts(newPosts);
      }
      } catch (err) {
        console.error(err)
      }
  }



  const allPosts = posts.map(post => (
    <div className='posts--all' key={post.id}>
        <h3 id='post--title' className='posts--each'><span className='home--wat'>TITLE: </span> {post.title}</h3>
        <h4 id='post--price' className='posts--each'><span className='home--wat'>author: </span>{post.author.username}</h4> 
        <p id='post--description' className='posts--each'><span className='home--wat'>Description: </span> {post.description}</p>
        <p id='post--price' className='posts--each'><span className='home--wat'>Price: </span> {post.price}</p> 
        <p id='post--price' className='posts--each'><span className='home--wat'>Location: </span> {post.location}</p> 
        {
        post.willDeliver === true ?
        <p id='post--price' className='posts--each'><span className='home--wat'>WillDeliver:</span> Yes!</p> :
        <p id='post--price' className='posts--each'><span className='home--wat'>WillDeliver:</span> No!</p>
      }

     
     { !props.token ? 
          '' :
      <button id="delete--button"  onClick={() => deletePost(post._id)}>delete</button> 
     }
    </div>
  ))

 

  return (
    <div className='home--container'>
        <div className='posts--container'>
            <h1 id='h1-posts'>Posts</h1>
            {allPosts}
            </div>
       <div className='postform--container'><Postform token={props.token}/></div>
    </div>
  )
}

export default Home