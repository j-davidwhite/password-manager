import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import "./Wallet.css";
import "@solana/wallet-adapter-react-ui/styles.css";

const Wallet = ({ connection }) => {
  const { connected, connect, disconnect, publicKey, sendTransaction, wallet } =
    useWallet();
  const [recipient, setRecipient] = useState(""); // To store the recipient address
  const [amount, setAmount] = useState(""); // To store the amount to send

  const toggleWallet = async () => {
    if (!wallet) {
      alert("Please select a wallet before connecting.");
      return;
    }

    try {
      if (connected) {
        await disconnect(); // Disconnect wallet
      } else {
        await connect(); // Connect wallet
      }
    } catch (error) {
      console.error("Error toggling wallet:", error);
    }
  };

  // Handle transaction logic
  const handleSendTransaction = async () => {
    if (!connected) {
      console.error(
        "Wallet is not connected. Please connect your wallet first."
      );
      return;
    }

    try {
      const recipientPubKey = new PublicKey(recipient);
      const lamports = parseFloat(amount) * 1e9; // Convert SOL to lamports

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      console.log("Transaction sent! Signature:", signature);

      // Confirm transaction
      const confirmation = await connection.confirmTransaction(
        signature,
        "confirmed"
      );
      console.log("Transaction confirmed:", confirmation);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return (
    <div className="wallet">
      <div className="wallet--container link--section">
        <div className="wallet--label">Link Wallet</div>
        <WalletMultiButton>
          {connected ? "Connected" : "Connect Wallet"}
        </WalletMultiButton>
        <div className="wallet-public-key">{publicKey?.toString()}</div>
      </div>

      <span></span>

      <div className="wallet--container vault--section">
        <div className="wallet--label">Vault</div>
        <div className="bump--section">
          <divs>Bump Seed</divs>
          <div>252</div>
        </div>
        <div className="pda--section">
          <div>Program Derived Address</div>
          <div>F9PN5fb22dpbiCnyLNrnREJnCr2HFFqLxbemWpwJ6fzk</div>
        </div>
      </div>

      <span></span>

      <div style={{ marginTop: "20px" }}>
        <h3>Send SOL</h3>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Amount (SOL)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleSendTransaction}>Send Transaction</button>
      </div>
    </div>
  );
};

export default Wallet;
