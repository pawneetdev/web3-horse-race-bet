import React, { createContext, useState } from 'react';
import { ethers } from 'ethers';
import abi from "../abi.json";

interface WalletContextType {
  walletAddress: string;
  isConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => Promise<boolean>;
  performSignIn: (user: any) => void;
  contract: any;
  user: {
    name: string,
    Id: number,
    walletAddress: string,
  };
}

interface WalletContextProps {
  children: React.ReactNode;
}

const defaultUser = { name: '', Id: 0, walletAddress: '' };

const WalletContext = createContext<WalletContextType>({
  walletAddress: '',
  isConnected: false,
  user: defaultUser,
  connectWallet: () => {},
  disconnectWallet: () => Promise.resolve(false),
  performSignIn: (user: any) => {},
  contract: null,
});


export const WalletProvider: React.FC<WalletContextProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(defaultUser);
  const [contract, setContract] = useState();

  const contractAddress = '0xa3c5Ed13B501C1dB44A286b89bF377c03A5930fF';
  let signer;
  const performSignIn = (user: any) => {
    setUser(user);
  }
  const connectWallet = async () => {
    try {
      if ((window as any).ethereum) {
        // Request access to the user's MetaMask account
        const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);
        console.log(await provider.getNetwork());
        signer = provider.getSigner();
        const ct = new ethers.Contract(contractAddress, abi, signer);
        setContract(ct as any);
        setIsConnected(true);
        setWalletAddress(accounts[0]);
      }
    } catch (error) {
      console.log('Error connecting to MetaMask:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      setIsConnected(false);
      setWalletAddress('')
      setUser(defaultUser);
      return true;
    } catch (error) {
      console.log('Error disconnecting from MetaMask:', error);
    }
    return false;
  };

  return (
    <WalletContext.Provider value={{walletAddress, isConnected, connectWallet, disconnectWallet, user, performSignIn, contract}}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
