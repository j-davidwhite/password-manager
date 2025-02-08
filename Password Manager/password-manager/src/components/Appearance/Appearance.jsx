import React, { useState, useEffect } from "react";
import "./Appearance.css";
import { useBackground } from "../../context/BackgroundContext";

const Appearance = () => {
  const { background, setBackground } = useBackground();

  const handleSelectBackground = (background) => {
    setBackground(background);
  };

  const importImages = (r) => r.keys().map(r);
  const backgroundImages = importImages(
    require.context("../../assets/Backgrounds", false, /\.(png|jpg)$/)
  );

  return (
    <div className="appearance" >
      <div className="appearance-section">
        <div>Theme</div>
        <div className="theme-container">{/* Input Themes */}</div>
      </div>
      <div className="appearance-section">
        <div>Background</div>
        <div className="background-container">
          {backgroundImages.map((background, index) => (
            <img
              key={index}
              className="background"
              src={background}
              alt={`Background ${index + 1}`}
              onClick={() => handleSelectBackground(background)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appearance;
