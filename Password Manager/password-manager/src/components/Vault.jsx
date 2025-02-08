import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Transaction,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

const Vault = ({ connection }) => {
  const programId = new PublicKey(
    "6SLPiVrrGb51mfViYSnqpC7jJaVhzRUMBnGgsUdTLZHx" // Replace with your program's ID
  );
  const { connected, publicKey, sendTransaction } = useWallet();
  const [vaultData, setVaultData] = useState(""); // Replace with actual vault data if needed

  // Function to create a vault (PDA initialization with program invocation)
  const createVault = async () => {
    if (!publicKey) {
      alert("Please connect wallet!");
      return;
    }

    try {
      // Derive the PDA using a seed and public key
      const [pda, bump] = await PublicKey.findProgramAddress(
        [Buffer.from("vault"), publicKey.toBuffer()],
        programId
      );

      console.log("Derived PDA:", pda.toString());
      console.log("Bump seed:", bump);

      // Check if PDA already exists by fetching its account data
      const accountInfo = await connection.getAccountInfo(pda);

      if (accountInfo) {
        // The PDA exists (account is initialized)
        console.log(accountInfo);
        console.log("PDA already exists:", pda.toString());
        alert("Vault already exists!");
        return;
      }

      // Create the transaction to initialize the vault (PDA creation)
      const transaction = new Transaction();

      // Set the fee payer (wallet publicKey)
      transaction.feePayer = publicKey;

      // Fetch a recent blockhash for the transaction
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      console.log("Fee Payer:", transaction.feePayer?.toString());
      console.log("Recent Blockhash:", transaction.recentBlockhash);

      // Add the SystemProgram instruction to the transaction (creating the vault account)
      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: pda,
          lamports: await connection.getMinimumBalanceForRentExemption(1024),
          space: 1024, // Adjust the size of the vault data
          programId,
        })
      );

      // Add the program instruction (invoking a smart contract function)
      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: pda, isSigner: false, isWritable: true }, // PDA account (target of contract logic)
          { pubkey: publicKey, isSigner: true, isWritable: false }, // User's wallet
        ],
        programId, // Your program's ID
        data: Buffer.alloc(0), // Optional: You can add specific data for the contract logic here
      });

      // Add the instruction to the transaction
      transaction.add(instruction);

      // Send the transaction to the blockchain
      const signature = await sendTransaction(transaction, connection);
      console.log("Transaction Signature:", signature);

      // Optionally confirm the transaction
      await sendAndConfirmTransaction(connection, transaction, [publicKey]);
      console.log("Transaction confirmed!");
    } catch (error) {
      console.error("Error creating vault:", error);
      alert("Error creating vault!");
    }
  };

  return (
    <div>
      <button onClick={createVault}>Create Vault</button>
    </div>
  );
};

export default Vault;
