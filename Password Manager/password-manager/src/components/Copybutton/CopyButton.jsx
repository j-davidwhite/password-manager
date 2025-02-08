import React, { useState } from "react";
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
      {copied ? <Check /> : <Copy />}
    </div>
  );
};

export default CopyButton;
