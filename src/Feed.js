import React, { useEffect, useState } from 'react'
import "./Feed.css";
import db from './firebase';
import MessageSender from './MessageSender';
import Post from './Post';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').where("FamilyID", "==", localStorage.getItem("family")).orderBy("timestamp", "desc").onSnapshot((snapshot) => 
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
    );
  }, []);
  return (
    <div className='feed'>
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
    </div>
  )
}

export default Feed