import React from "react";
//import { Transition } from "react-transition-group";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import Header from "../../components/Header/Header";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header className="header">Password Manager</Header>

      <Sidebar className="sidebar" />

      <div className="main-content">
        <Outlet />
      </div>
      <div className="footer">Footer</div>
    </div>
  );
};

export default Dashboard;
