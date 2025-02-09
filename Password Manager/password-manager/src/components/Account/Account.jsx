import React, { useState } from "react";
import "./Account.css";
import { LogOut } from "lucide-react";
import TextField from "@mui/material/TextField";

const Account = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  const handlePasswordModal = () => {
    setIsPasswordModalOpen(!isPasswordModalOpen);
  };
  return (
    <div className="account">
      <div className="account--section">
        <div>Master Password</div>

        <button className="account--btn" onClick={handlePasswordModal}>
          {isPasswordModalOpen ? "Back" : "Update"}
        </button>
      </div>

      {isPasswordModalOpen && (
        <div className="password-modal">
          <div className="password-modal__heading">Update Your Password</div>
          <div className="password-modal__text">Enter your current password and new password.</div>
          <div className="password-modal__input-section">
            <TextField
              className="password-modal__input"
              label="Current Password"
              variant="filled"
            />
            <TextField
              className="password-modal__input"
              label="New Password"
              variant="filled"
            />
            <TextField
              className="password-modal__input"
              label="Confirm New Password"
              variant="filled"
            />
          </div>
        </div>
      )}

      <span></span>

      <div className="account--section">
        <div>Delete Account</div>
        <button onClick={handleDeleteModal} className="account--btn">
          {isDeleteModalOpen ? "Back" : "Delete"}
        </button>
      </div>

      {isDeleteModalOpen && (
        <div className="delete-modal">
          <div  className="delete-modal__heading">Delete Account</div>
          <div  className="delete-modal__text">
            Deleting your account will remove all your information from our
            database and the Solana bloackchain. Your data cannot be recovered.
          </div>
          <TextField
            className="delete-modal__input"
            label="To confirm, type 'DELETE'"
            variant="filled"
          />
        </div>
      )}
      <span></span>

      <div className="account--section account--logout">
        <div className="logout">
          <LogOut />
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Account;
