import React, { useEffect, useState } from 'react'
import "./UserProfile.css"
import db from './firebase';
import { Avatar } from '@mui/material';
import Header from './Header'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import MessageSender from './MessageSender';
import Post from './Post';

function UserProfile() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').orderBy("timestamp", "desc").where("username", "==", localStorage.getItem("name")).onSnapshot((snapshot) => 
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
    );
    // eslint-disable-next-line
}, []);
  
  return (
    <>
    <Header />
    <div className='userProfile'>
      <div className="userProfile__header">
      <Avatar src={localStorage.getItem("photo")}
      sx={{ width: 76, height: 76 }} />
      <h4>{localStorage.getItem("name")}</h4>
    </div>
  <div className="userProfile__infos">
    <div className="userProfile__info">
      <FacebookIcon />
      <p>{localStorage.getItem("name")}</p>
      </div>
      <div className="userProfile__info">
      <InstagramIcon />
      <p>{localStorage.getItem("name")}</p>
      </div>
      <div className="userProfile__info">
      <EmailIcon />
      <p>{localStorage.getItem("email")}</p>
      </div>
  </div>
  </div>
  <MessageSender />
  {posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            profilePic={post.data.profilePic}
            message={post.data.message}
            timestamp={post.data.timestamp}
            username={post.data.username}
            image={post.data.image}
            />
        ))}
  </>
  )
}

export default UserProfile