import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useContext } from 'react';
import WalletContext from "../../store/WalletContext"
import { useNavigate } from 'react-router';

const Layout = () => {
  const { disconnectWallet, user } = useContext(WalletContext);
  const navigate = useNavigate();
  const handleHomeNavigate = () => {
    navigate('/')
  }
  const handleLoginLogout = () => {
    if(user.Id !== 0) {
      disconnectWallet();
      navigate('/');
    } else {
      navigate('/login');
    }
  }
  return(
    <div>
      <AppBar position="fixed">
          <Toolbar>
            <Button color="inherit" onClick={ handleHomeNavigate }>
              Home
            </Button>
            {user.Id !== 0 && <Button color="inherit" onClick={() => navigate('/bid')}>
              Bid
            </Button>}
            <Box flexGrow={1} /> {/* Empty box to push the wallet address to the right */}
            {user.Id !== 0 && <Button color="inherit" onClick={() => navigate('/portfolio')}>
              Portfolio
            </Button>}
            <Button color="inherit" onClick={ handleLoginLogout }>
              { user.Id !== 0 ? 'Logout' : 'Login' }
            </Button>
          </Toolbar>
        </AppBar>
        
        <Toolbar />
    </div>
  )
}

export default Layout;