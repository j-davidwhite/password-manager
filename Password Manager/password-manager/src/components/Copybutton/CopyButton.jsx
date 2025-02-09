import React, { useState } from "react";
import { CSSTransition } from 'react-transition-group';
import { Copy, Check } from "lucide-react";
import "./CopyButton.css";

const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false); // State to track if text was copied

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true); // Set to true when successfully copied
      setTimeout(() => setCopied(false), 2000); // Reset to false after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div onClick={copyToClipboard} className="copy-button">
      <CSSTransition
        in={copied}
        timeout={300}
        classNames="fade-check"
        unmountOnExit
      >
        <Check className="check"/>
      </CSSTransition>
      <CSSTransition
        in={!copied}
        timeout={300}
        classNames="fade-copy"
        
        unmountOnExit
      >
        <Copy className="copy"/>
      </CSSTransition>
    </div>
  );
};

export default CopyButton;
