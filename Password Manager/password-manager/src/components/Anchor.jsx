import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, setProvider, web3 } from '@project-serum/anchor';
import idl from './my_program.json';

const PROGRAM_ID = new PublicKey('9KZGojGtyd7R21ZRbhFBuqnYXWGAnPaGhTkBATzMrXGd');
const NETWORK = 'http://127.0.0.1:8899';

const Anchor = () => {
  const { connected, publicKey } = useWallet();

  const connection = new Connection(NETWORK, 'confirmed');
  const provider = new AnchorProvider(connection, useWallet(), {});
  setProvider(provider);

  const program = new Program(idl, PROGRAM_ID, provider); // Ensure 'idl' is imported and correctly used

  const initProgram = async () => {
    if (!publicKey) {
      alert('Please connect your wallet!');
      return;
    }

    try {
      const tx = await program.rpc.initialize();
      console.log('Transaction successful:', tx);
      alert('SUCCESS!');
    } catch (error) {
      console.error('Error:', error);
      alert('ERROR!');
    }
  };

  return (
    <button onClick={initProgram}>Initialize Program</button>
  );
};

export default Anchor;
