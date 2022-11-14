import React from 'react'
import { Button } from '@mui/material';
import Logo from "./assets/Logo.png";
import { auth, provider } from './firebase';
import './Login.css';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import Account from './Account';
import { Link } from "react-router-dom";


function Login(props) {
    
  const [user, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })

            localStorage.setItem("name", result.user.displayName);
            localStorage.setItem("uid", result.user.uid);
            localStorage.setItem("photo", result.user.photoURL);
            localStorage.setItem("email", result.user.email);

        })
        .catch((error) => alert(error.message));
    };

    console.log(user)

  return (
    <div className="app">
      {localStorage.getItem("name") ? (
        <Account onChange={props}/>
      ) : (
    <div className='login'>
        <div className="login__logo">
        <img src={Logo} alt="Logo" />
        </div>
        <div className="login__button">
        <Link to="/">
        <Button type="submit" onClick={signIn}>
            Sign In
        </Button>
        </Link>
        </div>
    </div>
      )}
    </div>
  )
}

export default Login