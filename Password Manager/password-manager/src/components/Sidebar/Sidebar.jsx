import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Storage from "../Storage/Storage";
import Logo from "../../assets/icons8-logo.png";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { House, Settings, Bell, KeyRound} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar--header">
        <img src={Logo}></img>
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
    </div>
  );
};

export default Sidebar;
