import React from "react";
import "./Header.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { Dot } from "lucide-react";
import { useAvatar } from "../../context/AvatarContext";

const Header = () => {
  const { connected, publicKey } = useWallet();
  const { avatar } = useAvatar();

  return (
    <div className="header">
      <h1>Hi, User</h1>
      {
        <div className="connection-status">
          <Dot className="dot" style={{ color: connected ? "green" : "red" }} />
          {connected ? (
            <div>Connected — {publicKey?.toString().slice(0, 20)}</div>
          ) : (
            <div>Disconnected</div>
          )}
        </div>
      }
      <img className="header--avatar" src={avatar}></img>
    </div>
  );
};

export default Header;
