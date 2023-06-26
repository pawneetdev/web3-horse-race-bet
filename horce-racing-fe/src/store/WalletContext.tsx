import React, { createContext, useState } from 'react';
import { ethers } from 'ethers';
import abi from "../abi.json";

interface WalletContextType {
  walletAddress: string;
  isConnected: boolean;
  connectWallet: (contractAddress: string) => void;
  disconnectWallet: () => Promise<boolean>;
  performSignIn: (user: any) => void;
  contract: any;
  user: {
    name: string,
    Id: number,
    walletAddress: string,
  };
  races: RaceIntf[];
}
export interface RaceIntf {
  raceId: number;
  loacationId: number;
  horses: { name: string, id: number }[];
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
  races: [],
});


export const WalletProvider: React.FC<WalletContextProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(defaultUser);
  const [contract, setContract] = useState();
  const [races, setRaces] = useState<RaceIntf[]>([]);

  let signer;

  const getHorses = async() => {
    const horses =  await (contract as any).getHorses();
    return horses;
  }


  const getRaces = async (horses: any) => {
    const race = await (contract as any).getRaces();
    let races: RaceIntf[] = [];
    const mapHorse = (horseId: number[]) => {
      let horseMap = [];
      for(let i = 0; i < horses.length; i++) {
        for(let j = 0; j < horseId.length; j++) {
          if(parseInt(horses[i].horseId) === horseId[j]) {
            horseMap.push({ name: horses[i].horseName, id: horseId[j] });
          }
        }
      }
      return horseMap;
    }
    for(let i = 0; i < race.length; i++) {
      const raceToUpdate: RaceIntf = {
        raceId: parseInt(race[i][0]),
        horses: mapHorse(race[i].participatingHorses.map((d: any) => parseInt(d))),
        loacationId: race[i].location
      }
      races.push(raceToUpdate);
    }
    
    setRaces(races);
  }
  const performSignIn = async (user: any) => {
    setUser(user);
    const horses = await getHorses();
    await getRaces(horses);
  }
  const connectWallet = async (contractAddress: string) => {
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
    <WalletContext.Provider value={{walletAddress, isConnected, connectWallet, disconnectWallet, user, performSignIn, contract, races}}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
