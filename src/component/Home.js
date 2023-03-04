import React, {useState, useEffect} from 'react'
import Postform from './Postform'
import { config } from '../config'
import { Link} from 'react-router-dom'

const Home = (props) => {
  console.log(props.posts)
  const [searchTerm, setSearchTerm] = useState('')
  const {posts} = props

  
   

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
          console.log(deletedpost)
      }
      } catch (err) {
        console.error(err)
      }
  }

  useEffect(() => {
    props.setPosts(posts);
  }, [posts]);

  const filteredPosts = searchTerm === '' ? 
  posts : posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 post.author.username.toLowerCase().includes(searchTerm.toLowerCase()))
  
  const allPosts = filteredPosts.map((post, key) => {
  return (
    <div className='posts--all' key={key}>
        <h3 id='post--title' className='posts--each'><span className='home--wat'>TITLE: </span> {post.title}</h3>
        <h4 id='post--price' className='posts--each'><span className='home--wat'>author: </span>{post.author ? post.author.username : ''}</h4> 
        <p id='post--description' className='posts--each'><span className='home--wat'>Description: </span> {post.description}</p>
        <p id='post--price' className='posts--each'><span className='home--wat'>Price: </span> {post.price}</p> 
        <p id='post--price' className='posts--each'><span className='home--wat'>Location: </span> {post.location}</p> 
        {
        post.willDeliver === true ?
        <p id='post--price' className='posts--each'><span className='home--wat'>WillDeliver:</span> Yes!</p> :
        <p id='post--price' className='posts--each'><span className='home--wat'>WillDeliver:</span> No!</p>
      }


<div className='posts--button--container'>
    {props.loggedInName !== post.author.username ? '' :
      <button id="delete--button"  onClick={() => deletePost(post._id)}>delete</button> 
    }
     {!props.isLoggedIn ? '' :
     <button id='send--message'><Link to={`/Profile?post_id=${post._id}`}>send message</Link></button>
     }
    </div>
    </div>
  )})

  return (
    <div className='home--home--container'>
    <h1 id='h1-posts'>Posts</h1>

    <input className ='search--bar' 
    type="text" 
    placeholder='Search by title/author here'
    onChange={(e) => {
      setSearchTerm(e.target.value);
    }}/>

    <div className='home--container'>
        <div className='posts--container'>
            {allPosts}
            </div>
       <div className='postform--container'><Postform 
       token={props.token} 
       setPosts={props.setPosts} 
       posts={posts} 
       />
       </div>
    </div>
    </div>
  )
}

export default Home