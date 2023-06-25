import React, { useState, useContext } from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import "./SigninSignup.scss"
import WalletContext from '../../store/WalletContext';
import { useNavigate } from 'react-router';

const SigninSignUpComponent: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const { walletAddress, connectWallet, performSignIn } = useContext(WalletContext);
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Handle sign-in logic with walletAddress
    performSignIn();
    navigate('/bid');
  };

  const handleSignUp = () => {
    // Handle sign-up logic with walletAddress and name
  };

  return (
    <div className="wrapper">
      <Container maxWidth="sm">
      {isSignUp && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
      </Grid>
      )}
      <Grid item xs={12}>
        <div className="wallet-flex">
          <TextField
            fullWidth
            label="Wallet Address"
            variant="outlined"
            value={walletAddress}
            disabled
          />
          <Button className="btn" variant="contained" color="success" onClick={connectWallet} disabled={walletAddress != ''}>
            Connect Wallet
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={isSignUp ? handleSignUp : handleSignIn}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="primary" fullWidth onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default SigninSignUpComponent;
