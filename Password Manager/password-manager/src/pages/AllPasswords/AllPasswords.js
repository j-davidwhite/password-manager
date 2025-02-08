import React, { useState, useEffect } from "react";
import Vault from "../../components/Vault";
import NewPassword from "../../components/NewPassword/NewPassword";
import GeneratePassword from "../../components/GeneratePassword/GeneratePassword";

import "./AllPasswords.css";
import "../../components/GeneratePassword/GeneratePassword";

const Passwords = () => {
  const [addCardTrans, setAddCardTrans] = useState(false);
  const [genCardTrans, setGenCardTrans] = useState(false);
  const [genBackTrans, setGenBackTrans] = useState(false);

  const handleNewPassPage = () => {
    setAddCardTrans(!addCardTrans);
    setGenCardTrans(false);
  };

  const handleGenPassPage = () => {
    setGenCardTrans(!genCardTrans);
    setGenBackTrans(!genBackTrans);
  };

  return (
    <div className="all-passwords">
      <div className="main-card">
        <div className="main-card-top">
          <h1>Welcome to Password Manager</h1>
          <div>
            Create a vault to start creating and managing your online
            credentials
          </div>
        </div>
        <div className="main-card-bottom">
          <Vault />
          <button
            onClick={handleNewPassPage}
            className={`add-password--btn ${addCardTrans ? "show-new" : ""}`}
          >
            Add Password
          </button>
        </div>
      </div>
      <NewPassword
        handleNewPassPage={handleNewPassPage}
        handleGenPassPage={handleGenPassPage}
        addCardTrans={addCardTrans}
        genBackTrans={genBackTrans}
      />
      <GeneratePassword
        handleNewPassPage={handleNewPassPage}
        handleGenPassPage={handleGenPassPage}
        addCardTrans={addCardTrans}
        genCardTrans={genCardTrans}
      />
    </div>
  );
};

export default Passwords;
