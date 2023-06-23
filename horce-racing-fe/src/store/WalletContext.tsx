import React, { createContext, useState } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  walletAddress: string;
  isConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

interface WalletContextProps {
  children: React.ReactNode;
}

const WalletContext = createContext<WalletContextType>({
  walletAddress: '',
  isConnected: false,
  connectWallet: () => {},
  disconnectWallet: () => {}
});


export const WalletProvider: React.FC<WalletContextProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

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
    } catch (error) {
      console.log('Error disconnecting from MetaMask:', error);
    }
  };

  return (
    <WalletContext.Provider value={{walletAddress, isConnected, connectWallet, disconnectWallet}}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
