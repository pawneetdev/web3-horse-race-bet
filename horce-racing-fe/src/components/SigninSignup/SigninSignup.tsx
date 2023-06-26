import React, { useState, useContext } from 'react';
import { Button, Container, Grid, TextField, Snackbar, Alert } from '@mui/material';
import "./SigninSignup.scss"
import WalletContext from '../../store/WalletContext';
import { useNavigate } from 'react-router';
import LoadingPopup from "../LoadingPopup/LoadingPopup";

const SigninSignUpComponent: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { walletAddress, connectWallet, disconnectWallet, performSignIn, contract } = useContext(WalletContext);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleSignIn = async() => {
    // Handle sign-in logic with walletAddress
    try {
      const user = await contract.logInUser();
      const userId = parseInt(user.userId);
      if(userId !== 0) {
        performSignIn({ name: user[2], walletAddress: user[1], Id: userId });
        navigate('/bid');
      } else {
        setError('user does not exist, please register!');
      }
    } catch(err: any) {
      setError("transaction rejected!");
    }
  };

  const handleClose = () => {
    setError("");
  }

  const handleSignUp = async() => {
    // Handle sign-up logic with walletAddress and name
    try {
      const transaction = await contract.createUser(name);
      setLoading(true);
      const receipt = await transaction.wait();
      setLoading(false);
      if(receipt.status === 1) {
        const user = await contract.logInUser();
        const userId = parseInt(user.userId);
        if(userId !== 0) {
          performSignIn({ name: user[2], walletAddress: user[1], Id: userId });
          navigate('/bid');
        } else {
          setError('error creating user!');
        }
      }
    } catch(err: any) {
      setError("transaction rejected!");
    }
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
          <Button className="btn" variant="contained" color={ walletAddress !== '' ? 'error' : 'success' } onClick={ walletAddress !== '' ? disconnectWallet : connectWallet }>
            {walletAddress !== '' ? 'Disconnect wallet' : 'Connect Wallet'}
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
      <Snackbar open={error !== ""} autoHideDuration={2000} onClose={handleClose} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="error"
          sx={{
            position: 'relative',
            '& .MuiAlert-action': {
              position: 'absolute',
              top: '8px',
              right: '8px',
            },
          }}>
          {error}
        </Alert>
      </Snackbar>
      <LoadingPopup loadPopup={isLoading} />
    </div>
  );
};

export default SigninSignUpComponent;
