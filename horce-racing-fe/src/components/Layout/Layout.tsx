import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useContext } from 'react';
import WalletContext from "../../store/WalletContext"
import { useNavigate } from 'react-router';

const Layout = () => {
  const { isConnected, connectWallet, disconnectWallet } = useContext(WalletContext);
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
            <Button color="inherit" onClick={() => navigate('/portfolio')}>
              Portfolio
            </Button>
          </Toolbar>
        </AppBar>
        
        <Toolbar />
    </div>
  )
}

export default Layout;