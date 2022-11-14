import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import "./MessageSender.css"
import EventIcon from '@mui/icons-material/Event';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import db from './firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Link } from "react-router-dom";

function MessageSender() {

    const [input, setInput] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        db.collection("posts").add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profilePic: localStorage.getItem("photo"),
            username: localStorage.getItem("name"),
            image: imageUrl,
            FamilyID: localStorage.getItem("family"),
        });

        console.log()
        setInput("");
        setImageUrl("");
    }

  return (
    <div className='messageSender'>
        <div className="messageSender__top">
            <Avatar src={localStorage.getItem("photo")} />
            <form>
                <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='messageSender__input'
                placeholder={'Post something new for your Family'} />
                <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder={'Post an Image (Optional)'}/>
                <button onClick={handleSubmit} type="submit">
                    hidden submit
                </button>
            </form>
        </div>
        <div className="messageSender__bottom">
        <Link to="/calender" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div className="messageSender__option">
                <EventIcon style={{color: "#8E793E"}} />
                <h3>New Event</h3>
            </div>
            </Link>
            <div className="messageSender__option">
                <PhotoLibraryIcon style={{color: "#8E793E"}} />
                <h3>Photo</h3>
            </div>
            <Link to="/calender" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div className="messageSender__option">
                <InsertEmoticonIcon style={{color: "#8E793E"}} />
                <h3>Activity/Task</h3>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default MessageSender