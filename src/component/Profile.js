import React from 'react'

const Messages = () => {
    return (
    <div className='message--container'>
        <h1>Profile</h1>
        <h1>message</h1>
        <input type='text' placeholder='user' className='message--input'/>
        <input type='text' placeholder='message' className='message--input' id='message--pass--input'/>
        <button className='message--send--button'>send</button>
    </div>
    )
}




const Profile = () => {
  return (
    <Messages />
  )
}

export default Profile