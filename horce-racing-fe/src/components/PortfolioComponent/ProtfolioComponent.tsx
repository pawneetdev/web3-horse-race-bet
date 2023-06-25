import React, { useContext } from "react";
import WalletContext from "../../store/WalletContext";
import { Card, CardContent, Grid, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalance';
import "./ProtfolioComponent.scss";

const PortfolioComponent = () => {
  const { walletAddress } = useContext(WalletContext);
  return (
    <div className="flex-80">
      <Card>
      <CardContent>
        <AccountBalanceWalletIcon />
        <Typography variant="subtitle1">Wallet Address:</Typography>
        <Typography variant="body1">{walletAddress}</Typography>
        <Typography variant="subtitle1">Token Balance:</Typography>
        <Typography variant="body1">1200</Typography>
      </CardContent>
    </Card>
    </div>
  )
}
export default PortfolioComponent;