import React from "react";
import "./Settings.css";
import { NavLink, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Settings = () => {
  return (
    <div className="settings">
      <div className="settings--nav">
        <div className="settings--nav-item">
          <NavLink
            className="settings--nav-link"

            to="/settings/profile"
          >
            Profile
          </NavLink>
        </div>
        <div className="settings--nav-item">
          <NavLink
            className="settings--nav-link"

            to="/settings/account"
          >
            Account
          </NavLink>
        </div>
        <div className="settings--nav-item">
          <NavLink
            className="settings--nav-link"
  
            to="/settings/wallet"
          >
            Wallet
          </NavLink>
        </div>
        <div className="settings--nav-item">
          <NavLink
            className="settings--nav-link"
 
            to="/settings/appearance"
          >
            Appearance
          </NavLink>
        </div>
      </div>
      <span></span>

      <div className="settings--main-content"></div>
      <Outlet />
    </div>
  );
};

export default Settings;
