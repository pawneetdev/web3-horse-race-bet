import { useContext, useEffect, useState } from "react";
import WalletContext from "../../store/WalletContext";
import { Card, CardContent, Typography, Alert } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalance';
import "./ProtfolioComponent.scss";
import tokenAbi from "../../token_abi.json";
import { ethers, Contract } from 'ethers';

const PortfolioComponent = () => {
  const { user , signer } = useContext(WalletContext);
  const [tokenBalance, setTokenBalance] = useState(0);
  const checkBalanceUpdateEvents = async(from: string, to: string, amount: any, tokeContract: Contract) => {
    console.log(amount);
    await getBalance(tokeContract);
  }
  const getBalance = async (contract: Contract) => {
    const balance = await contract.balanceOf(user.walletAddress);
    const converted = parseInt(balance) / 10**18;
    setTokenBalance(converted);
    return converted;
  }
  useEffect(() => {
    const fetchTokenBalance = async() => {
      const tokenContractAddress = '0xef6b908162c69bc8c2d8045f893c704b6119be62';
      const tokenContract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);
      const balance = await getBalance(tokenContract);
      tokenContract.on('Transfer', (from: any, to: any, amount: any) => checkBalanceUpdateEvents(from, to, amount, tokenContract));
    }
    signer && fetchTokenBalance();
  }, [signer])
  return (
    <div className="flex-80">
      {user.Id === 0 ? 
        <Alert severity="error" variant="filled">
          Please login to access portfolio!
        </Alert>
        :
        <Card>
          <CardContent>
            <AccountBalanceWalletIcon />
            <Typography variant="subtitle1">Wallet Address:</Typography>
            <Typography variant="body1">{user.walletAddress}</Typography>
            <Typography style={{ color: 'green', fontWeight: 'bold', fontSize: '20px' }} variant="subtitle1">RACE Token Balance: {tokenBalance}</Typography>
            <Typography variant="subtitle1">Name: {user.name}</Typography>
            <Typography variant="subtitle1">Id: {user.Id}</Typography>
          </CardContent>
        </Card>
      }
    </div>
  )
}
export default PortfolioComponent;