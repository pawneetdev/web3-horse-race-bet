import React, { useContext } from "react";
import WalletContext from "../../store/WalletContext";
import { Card, CardContent, Typography, Alert } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalance';
import "./ProtfolioComponent.scss";

const PortfolioComponent = () => {
  const { user } = useContext(WalletContext);
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
            <Typography variant="subtitle1">Name: {user.name}</Typography>
            <Typography variant="subtitle1">Id: {user.Id}</Typography>
          </CardContent>
        </Card>
      }
    </div>
  )
}
export default PortfolioComponent;