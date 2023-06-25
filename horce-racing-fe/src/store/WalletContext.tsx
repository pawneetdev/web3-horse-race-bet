import React, { createContext, useState } from 'react';
import { ethers } from 'ethers';


interface WalletContextType {
  walletAddress: string;
  isConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => Promise<boolean>;
  performSignIn: () => void;
  hasSignedIn: boolean;
}

interface WalletContextProps {
  children: React.ReactNode;
}

const WalletContext = createContext<WalletContextType>({
  walletAddress: '',
  isConnected: false,
  hasSignedIn: false,
  connectWallet: () => {},
  disconnectWallet: () => Promise.resolve(false),
  performSignIn: () => {},
});


export const WalletProvider: React.FC<WalletContextProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [hasSignedIn, setSignIn] = useState(false);

  const performSignIn = () => {
    setSignIn(true);
  }
  const connectWallet = async () => {
    try {
      if ((window as any).ethereum) {
        // Request access to the user's MetaMask account
        const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);
        console.log(await provider.getNetwork());
        setIsConnected(true);
        setWalletAddress(accounts[0])
      }
    } catch (error) {
      console.log('Error connecting to MetaMask:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      setIsConnected(false);
      setWalletAddress('')
      setSignIn(false);
      return true;
    } catch (error) {
      console.log('Error disconnecting from MetaMask:', error);
    }
    return false;
  };

  return (
    <WalletContext.Provider value={{walletAddress, isConnected, connectWallet, disconnectWallet, hasSignedIn, performSignIn}}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
