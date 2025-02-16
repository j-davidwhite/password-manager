import React, { useState } from "react";
import "./Profile.css";
import Avatar from "../Avatar/Avatar";
import { useAvatar } from "../../context/AvatarContext";
import TextField from "@mui/material/TextField";

const Profile = () => {
  const { avatar, setAvatar } = useAvatar();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("Joshua");
  const [lastName, setLastName] = useState("White");

  const handleNameModal = () => setIsNameModalOpen(!isNameModalOpen);
  const handlePhotoModal = () => setIsPhotoModalOpen(!isPhotoModalOpen);

  const handleSelectAvatar = (avatar) => {
    setAvatar(avatar);
    setIsPhotoModalOpen(false);
  };
  // Handle changes in text fields
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  return (
    <div className="profile">
      <div className="profile--photo">
        <div className="profile--label">Photo</div>
        <img className="profile--img profile--value" src={avatar} />
        <button onClick={handlePhotoModal} className="profile--edit-btn">
          {isPhotoModalOpen ? "Back" : "Edit"}
        </button>
      </div>
      <Avatar
        handleSelectAvatar={handleSelectAvatar}
        isPhotoModalOpen={isPhotoModalOpen}
      />

      <span></span>

      <div className="profile--name">
        <div className="profile--label">Name</div>
        <div className="profile--value">
          {firstName} {lastName}
        </div>
        <button onClick={handleNameModal} className="profile--edit-btn">
          {isNameModalOpen ? "Back" : "Edit"}
        </button>
      </div>
      {isNameModalOpen && (
        <div className="name-modal">
          <div>Enter your first and last</div>
          <div className="name-modal__input-section">
            <TextField
              className="name-modal__input"
              label="First Name"
              variant="filled"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <TextField
              className="name-modal__input"
              label="Last Name"
              variant="filled"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="name-modal__btn">Confirm</div>
        </div>
      )}
      <span></span>
      <div className="profile--email">
        <div className="profile--label">Email Address</div>
        <div className="profile--value">j.white@gmail.com</div>
        <button className="profile--edit-btn">Edit</button>
      </div>
    </div>
  );
};

export default Profile;

{
  /*   const [username, setUsername] = useState("");
  const [showSaveBar, setShowSaveBar] = useState(false);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    if (!showSaveBar) {
      setShowSaveBar(true);
    }
  }; const saveChanges = () => {
    console.log("Changes saved:", username);
    setShowSaveBar(false); // Hide the save bar after saving
  };<div class="save-bar hidden">
  <div>Careful — you have unsaved changes!</div>
  <button>Reset</button>
  <button>Save Changes</button>
</div>;*/
}
