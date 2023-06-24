import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useContext } from 'react';
import WalletContext from "../../store/WalletContext"
import { useNavigate } from 'react-router';

const Layout = () => {
  const { isConnected, connectWallet, disconnectWallet, walletAddress } = useContext(WalletContext);
  const navigate = useNavigate();
  const handleHomeNavigate = () => {
    navigate('/')
  }
  return(
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
  )
}

export default Layout;