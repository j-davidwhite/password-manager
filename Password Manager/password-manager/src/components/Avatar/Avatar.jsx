import React, { useState, useEffect } from "react";
import "./Avatar.css";
import { useAvatar } from "../../context/AvatarContext";

const Avatar = ({ handleSelectAvatar, isPhotoModalOpen }) => {
  /* Image Loading */
  const [isLoading, setIsLoading] = useState(true);
  const { avatar } = useAvatar();

  const handleLoad = (index) => {
    setIsLoading((prevState) => ({ ...prevState, [index]: false }));
  };

  useEffect(() => {
    const loadingState = {};
    menAvatar.forEach((_, index) => {
      loadingState[index] = true;
    });
    setIsLoading(loadingState);
  }, [avatar]);

  /* Import Avatar Images */
  const importImages = (r) => r.keys().map(r);
  const menAvatar = importImages(
    require.context("../../assets/Avatar/Male", false, /\.(png)$/)
  );
  const womenAvatar = importImages(
    require.context("../../assets/Avatar/Female", false, /\.(png)$/)
  );

  return (
    <>
      {isPhotoModalOpen && (
        <div className={`avatar ${isPhotoModalOpen ? "show-avatar" : ""}`}>
          <div className="photo-group">
            <h3>Male</h3>
            <div className="avatar-container">
              {menAvatar.map((avatar, index) => (
                <div key={index}>
                  {isLoading[index] && (
                    <div className="loading-animation">
                      <div className="spinner"></div>
                    </div>
                  )}
                  <img
                    className="avatar"
                    src={avatar}
                    alt={`Men Avatar ${index + 1}`}
                    onClick={() => handleSelectAvatar(avatar)}
                    onLoad={() => handleLoad(index)}
                    style={{ display: isLoading[index] ? "none" : "block" }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="photo-group">
            <h3>Female</h3>
            <div className="avatar-container">
              {womenAvatar.map((avatar, index) => (
                <div key={index}>
                  {isLoading[index] && (
                    <div className="loading-animation">
                      <div className="spinner"></div>
                    </div>
                  )}
                  <img
                    className="avatar"
                    src={avatar}
                    alt={`Women Avatar ${index + 1}`}
                    onClick={() => handleSelectAvatar(avatar)}
                    onLoad={() => handleLoad(index)}
                    style={{ display: isLoading[index] ? "none" : "block" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Avatar;
