import React, { useState } from 'react';
import { Button, Card, CardContent, SelectChangeEvent } from '@mui/material';
import './BidComponent.scss';
import { RaceIntf, RACES } from '../../constants/races';
import DialogComponent from "../DialogComponent/DialogComponent";

const BiddingComponent = () => {
  const races: RaceIntf[] = RACES;

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
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

  const handleBidSubmit = () => {
    // Perform bid submission logic here
    console.log('Bid submitted:', bidType);
    console.log('Bid submitted:', horse);
    // Close the dialog
    setIsDialogOpen(false);
  };

  return (
    <div className="outer-container">
      {races.map((race) => {
        return (
          <Card key={race.key} className="wrapper">
            <CardContent>
              <h2>{race.title}</h2>
              <p>{race.description}</p>
              <Button variant="contained" onClick={handleBidButtonClick}>
                Place a Bid
              </Button>
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
