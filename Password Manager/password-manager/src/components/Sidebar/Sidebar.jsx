import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Storage from "../Storage/Storage";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { House, Settings, Bell, KeyRound} from 'lucide-react';

const Sidebar = () => {

  const [logo, setLogo] = useState('');
  const [count, setCount] = useState(0)

  const handleChangeLogo = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1;
      const LogoPath = window.location.origin + `/logo (${newCount}).png`; // Construct the new logo path
      setLogo(LogoPath);
      return newCount; // Return the updated count value
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar--header">
        <img src={logo}></img>
        <h2>NodeVault</h2>
      </div>
      <div className="sidebar--nav">
        <NavLink
          className="sidebar--item"
          activeClassName="active"
          to="/all-passwords"
        >
          <House/>
          All Passwords
        </NavLink>

        <NavLink
          className="sidebar--item"
          activeClassName="active"
          to="/notifications"
        >
          <Bell/>
          Notifications
        </NavLink>

        <NavLink
          className="sidebar--item"
          activeClassName="active"
          to="/shared-passwords"
        >
          <KeyRound/>
          Shared Passwords
        </NavLink>

        <NavLink
          className="sidebar--item"
          activeClassName="active"
          to="/settings"
        >
          <Settings />
          Settings
        </NavLink>
      </div>
      <div className="sidebar--storage">
        <Storage />
      </div>
      <button onClick={handleChangeLogo}   style={{ width: '40px', height: '20px' }}>Button</button>
    </div>
  );
};

export default Sidebar;
