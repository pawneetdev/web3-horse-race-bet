import React, { useContext } from "react";
import WalletContext from "../../store/WalletContext";
import { Card, CardContent, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalance';
import "./ProtfolioComponent.scss";

const PortfolioComponent = () => {
  const { user } = useContext(WalletContext);
  return (
    <div className="flex-80">
      <Card>
      <CardContent>
        <AccountBalanceWalletIcon />
        <Typography variant="subtitle1">Wallet Address:</Typography>
        <Typography variant="body1">{user.walletAddress}</Typography>
        <Typography variant="subtitle1">Name: {user.name}</Typography>
        <Typography variant="subtitle1">Id: {user.Id}</Typography>
      </CardContent>
    </Card>
    </div>
  )
}
export default PortfolioComponent;