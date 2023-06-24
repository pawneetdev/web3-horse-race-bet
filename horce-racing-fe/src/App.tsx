import './App.scss';
import BiddingComponent from "./components/BidComponent/BidComponent"
import HomeComponent from "./components/Home/HomeComponent"
import { useContext } from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import WalletContext from "./store/WalletContext"
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router';

function App() {
  const { isConnected, connectWallet, disconnectWallet, walletAddress } = useContext(WalletContext);
  const navigate = useNavigate();
  const handleHomeNavigate = () => {
    navigate('/')
  }
  return (
    <div className="App">
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Button color="inherit" onClick={ handleHomeNavigate }>
              Home
            </Button>
            <Button color="inherit" onClick={isConnected ? disconnectWallet : connectWallet}>
              {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
            </Button>
            <Box flexGrow={1} /> {/* Empty box to push the wallet address to the right */}
            {walletAddress && (
              <Typography variant="subtitle1" style={{ color: 'lightgreen' }}>
                Wallet Address: {walletAddress}
              </Typography>
            )}
          </Toolbar>
        </AppBar>
        
        <Toolbar />
      </div>
      <Routes>
        <Route path="/" element={<HomeComponent/>}>
        </Route>
        <Route path="/bid" element={<BiddingComponent/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
