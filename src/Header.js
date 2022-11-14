import React from 'react';
import './Header.css';
import Logo from "./assets/Logo.png";
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import { Avatar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";

function Header(props) {

  const active = "header__option header__option--active";

  return (
    <div className='header'>
        <div className="header__left">
        <img src={Logo} alt="Logo" />
        <div className="header__input">
          <SearchIcon />
          <input type="text" placeholder='Search Family Tree'/>
        </div>
        </div>
        <div className="header__center">
          {props.active === "home" ? (<div className={active}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <HomeIcon fontSize='large' />
            </Link>
            </div>) 
            : 
            <div className="header__option">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <HomeIcon fontSize='large' />
            </Link>
            </div>
            }
          {props.active === "calender" ? (<div className={active}>
          <Link to="/calender" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <CalendarMonthIcon fontSize='large' />
            </Link>
            </div>) 
            : 
            <div className="header__option">
          <Link to="/calender" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <CalendarMonthIcon fontSize='large' />
            </Link>
            </div>
            }
            {props.active === "tree" ? (<div className={active}>
          <Link to="/family-tree" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <SupervisedUserCircleRoundedIcon fontSize='large' />
            </Link>
            </div>) 
            : 
            <div className="header__option">
          <Link to="/family-tree" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <SupervisedUserCircleRoundedIcon fontSize='large' />
            </Link>
            </div>
            }
        </div>
        <div className="header__right">
          <div className="header__info">
            <Avatar src={localStorage.getItem("photo")} />
            <h4>{localStorage.getItem("name")}</h4>
          </div>
          <IconButton>
            <AddIcon />
          </IconButton>
          <IconButton>
            <ForumIcon />
          </IconButton>
          <IconButton>
            <NotificationsActiveIcon />
          </IconButton>
          <Link to="/login">
          <IconButton onClick={() => {localStorage.clear()}}>
            <LogoutIcon />
          </IconButton>
          </Link>
        </div>
        </div>
  )
}

export default Header