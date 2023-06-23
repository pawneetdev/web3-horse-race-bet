import React, { useContext, useState } from 'react';
import { Button, Card, CardContent, SelectChangeEvent, Tooltip } from '@mui/material';
import './BidComponent.scss';
import { RaceIntf, RACES } from '../../constants/races';
import DialogComponent from "../DialogComponent/DialogComponent";
import WalletContext from '../../store/WalletContext';

const BiddingComponent = () => {
  const races: RaceIntf[] = RACES;
  const { isConnected } = useContext(WalletContext);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isToolTip, setToolTip] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [bidType, setBidType] = useState<string>('');
  const [horse, setHorse] = useState<string>('');

  const handleBidButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleBidTypeChange = (event: SelectChangeEvent<{ value: unknown }>) => {
    setBidType(event.target.value as string);
  };

  const handleHorseChange = (event: SelectChangeEvent<{ value: unknown }>) => {
    setHorse(event.target.value as string);
  };

  const handleMouseOver = (event: React.MouseEvent, index: number) => {
    setCurrentCard(index);
    if(!isConnected) {
      setToolTip(true);
    }
  }

  const handleMouseLeave = (event: React.MouseEvent, index: number) => {
    setCurrentCard(index);
    setToolTip(false);
  }

  const handleBidSubmit = () => {
    // Perform bid submission logic here
    console.log('Bid submitted:', bidType);
    console.log('Bid submitted:', horse);
    // Close the dialog
    setIsDialogOpen(false);
  };

  return (
    <div className="outer-container">
      {races.map((race, index) => {
        return (
          <Card key={race.key} className="wrapper">
            <CardContent>
              <h2>{race.title}</h2>
              <p>{race.description}</p>
              <Tooltip title="Should connect to wallet to place Bid" open={isToolTip && index === currentCard}>
                <span onMouseOver={(event) => handleMouseOver(event, index)} onMouseLeave={ (event) => handleMouseLeave(event, index)}>
                  <Button variant="contained" onClick={handleBidButtonClick} disabled={!isConnected}>
                    Place a Bid
                  </Button>
                </span>
              </Tooltip>
            </CardContent>
          </Card>
        )
      })}

    <DialogComponent isOpen={isDialogOpen}
        onClose={handleDialogClose}
        bidType={bidType}
        onBidTypeChange={handleBidTypeChange}
        horse={horse}
        onHorseChange={handleHorseChange}
        onBidSubmit={handleBidSubmit} />
      
    </div>
  );
};

export default BiddingComponent;
