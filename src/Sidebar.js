import React from 'react'
import "./Sidebar.css"
import SidebarRow from './SidebarRow'
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Link } from "react-router-dom";

function Sidebar() {

  var users = localStorage.getItem("name");

  return (
    <div className='sidebar'>
        <Link to={`user-profile/${users}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <SidebarRow src={localStorage.getItem("photo")} title={localStorage.getItem("name")} />
        </Link>
        <Link to={`user-profile/${users}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <SidebarRow Icon={EmojiFlagsIcon} title="Profile" />
        </Link>
        <Link to={`family-members`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <SidebarRow Icon={PeopleIcon} title="Family Members"  />
        </Link>
        <SidebarRow Icon={ChatIcon} title="Messanger" />
        <SidebarRow Icon={VideoLibraryIcon} title="Gallery" />
        <SidebarRow Icon={LocalHospitalIcon} title="Project Information Center" />
    </div>
  )
}

export default Sidebar