import './App.scss';
import BiddingComponent from "./components/BidComponent/BidComponent"
import { useContext } from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import WalletContext from "./store/WalletContext"

function App() {
  const { isConnected, connectWallet, disconnectWallet, walletAddress } = useContext(WalletContext);
  
  return (
    <div className="App">
      <div>
        <AppBar position="fixed">
          <Toolbar>
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
      <p>Welcome to Horce Race Bet!</p>
      <BiddingComponent />
    </div>
  );
}

export default App;
