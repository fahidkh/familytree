import { Avatar } from '@mui/material'
import React from 'react'
import "./Post.css"
import { useState } from 'react';
import { useEffect } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import db from './firebase';

function Post({profilePic, image, postId, username, timestamp, message}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if(postId) {
      unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy('timestamp').onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }

    return() => {
      unsubscribe();
    };

  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: localStorage.getItem("name"),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
  }

  return (
    <div className='post'>
      <div className="post__top">
        <Avatar src={profilePic}
        className="post__avatar" />
        <div className="post__topInfo">
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      <div className="post__bottom">
        <p>{message}</p>
      </div>

      <div className="post__image">
          <img src={image} alt="" />
    </div>
    <div className="post__comments">
      {comments.map((comment) => (
        <p>
          <strong>{comment.username}</strong> {comment.text}
        </p>
      ))}
    </div>
    <form className='post__commentBox'>
        <input className='post__input'
        placeholder='Add a Comment...'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        />
        <button className='post__button'
        disabled={!comment}
        type="submit"
        onClick={postComment}>Post</button>
      </form>
    </div>
  )
}

export default Post