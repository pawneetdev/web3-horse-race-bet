import React, { useContext, useState } from 'react';
import { Button, Card, CardContent, SelectChangeEvent, Tooltip } from '@mui/material'
import classes from './BidComponent.module.scss';
import { LOCATIONS, Bets} from '../../constants/races';
import DialogComponent from "../DialogComponent/DialogComponent";
import WalletContext, { RaceIntf } from '../../store/WalletContext';
import LoadingPopup from "../LoadingPopup/LoadingPopup";


export interface BetIntf {
  horses: {name: string, id: number}[],
  betTypes: Bets[],
  raceId: number,
}

const BiddingComponent = () => {
  // const races: RaceIntf[] = RACES;
  const { isConnected, races, user, contract } = useContext(WalletContext);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isToolTip, setToolTip] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [bidType, setBidType] = useState<string>('');
  const [horse, setHorse] = useState<string>('');
  const [dialogData, setDialogData] = useState<BetIntf>({} as BetIntf);
  const [isLoading, setLoading] = useState(false);


  const handleBidButtonClick = (race: RaceIntf) => {
    const dialog: BetIntf = {
      horses: race.horses,
      betTypes: getBetTypes(race.horses.length, race.loacationId),
      raceId: race.raceId,
    }
    setDialogData(dialog);
    setIsDialogOpen(true);
  };

  const getBetTypes = (horseCount: number, locId: number) => {
    let betTypes: Bets[] = [];
    if(locId === 0) {
      betTypes = [Bets.Show, Bets.Place, Bets.Straight];
    } else {
      betTypes = [Bets.Show, Bets.Straight];
    }
    if(locId === 0 && horseCount < 4) {
      betTypes = [Bets.Place, Bets.Straight];
    }
    if(horseCount < 3) {
      betTypes = [Bets.Show, Bets.Straight];
    }
    return betTypes;
  }

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

  const handleBidSubmit = async() => {
    // Perform bid submission logic here
    const betObj = {
      betType: bidType,
      raceId: dialogData.raceId,
      userId: user.Id,
      horseId: horse
    }
    console.log('Bid submitted:', betObj);
    try {
      const transaction = await contract.placeNewBet(bidType, dialogData.raceId, user.Id, horse);
      setIsDialogOpen(false);
      setLoading(true);
      const receipt = await transaction.wait();
      setLoading(false);
      if(receipt.status === 1) {
        alert('transaction successfull!')
      } else {
        alert('transaction failed!')
      }
    } catch(err: any) {
      console.log(err.message);
    } finally {
      setIsDialogOpen(false);
    }
    // Close the dialog
  };

  return (
    <div className={classes['outer-container']}>
      <div>
        <img className={classes['img-wrapper']} src="../../../../assets/race.gif" alt="race gif"/>
      </div>
      {races.map((race, index) => {
        const loc = LOCATIONS[race.loacationId];
        return (
          <Card key={race.raceId} className={`${classes.wrapper}`}>
            <CardContent>
              <h2>{ loc.title }</h2>
              <p style={{ fontFamily: "DynaPuff" }}>{loc.description}</p>
              <Tooltip title="Should connect to wallet to place Bid" open={isToolTip && index === currentCard}>
                <span onMouseOver={(event) => handleMouseOver(event, index)} onMouseLeave={ (event) => handleMouseLeave(event, index)}>
                  <Button variant="contained" onClick={(event) => handleBidButtonClick(race)} disabled={!isConnected}>
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
        dialogData={dialogData}
        onBidSubmit={handleBidSubmit} />

    <LoadingPopup loadPopup={isLoading} />
      
    </div>
  );
};

export default BiddingComponent;
