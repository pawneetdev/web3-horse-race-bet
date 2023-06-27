import React, { useContext, useState } from 'react';
import { Button, Card, CardContent, SelectChangeEvent, Tooltip } from '@mui/material'
import classes from './BidComponent.module.scss';
import { LOCATIONS, Bets} from '../../constants/races';
import DialogComponent from "../DialogComponent/DialogComponent";
import WalletContext, { RaceIntf } from '../../store/WalletContext';
import LoadingPopup from "../LoadingPopup/LoadingPopup";
import { styled } from '@mui/system';

const StyledCardContent = styled(CardContent)`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  padding: 10;
`;



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

  const getImageUrl = (location: number) => {
    switch(location) {
      case 0:
        return 'https://images.squarespace-cdn.com/content/v1/58c9c6e69f74567f6f50dfba/1493077259677-X4833RH6DP9870MKHOAN/image-asset.jpeg?format=2500w';
      case 1:
        return 'https://cdn-attachments.timesofmalta.com/e09afadb61e66fceaf59788e45471a92811debd8-1634556074-dc82dcfb-1920x1280.jpg';
      case 2:
        return 'https://cdn.onestopadventures.com.au/wp-content/uploads/Flemington-horses.jpg';
      case 3:
        return 'https://www.ft.com/__origami/service/image/v2/images/raw/https://d1e00ek4ebabms.cloudfront.net/production/21ce64b5-9745-4bff-aac5-9e105219aa81.jpg?source=next&fit=scale-down&quality=highest&width=1920&dpr=2';
    }
  }

  return (
    <div className={classes['outer-container']}>
      <div>
        <img className={classes['img-wrapper']} src="../../../../assets/race.gif" alt="race gif"/>
      </div>
      {races.map((race, index) => {
        const loc = LOCATIONS[race.loacationId];
        return (
          <Card key={race.raceId} className={`${classes.wrapper}`}
            sx={{
              backgroundImage: `url(${getImageUrl(race.loacationId)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#ffffff',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
            <StyledCardContent>
              <h2 style={{margin: 0}}>{ loc.title }</h2>
              <p style={{ fontFamily: "DynaPuff" }}>{loc.description}</p>
              <Tooltip title="Should connect to wallet to place Bid" open={isToolTip && index === currentCard}>
                <span onMouseOver={(event) => handleMouseOver(event, index)} onMouseLeave={ (event) => handleMouseLeave(event, index)}>
                  <Button variant="contained" onClick={(event) => handleBidButtonClick(race)} disabled={!isConnected}>
                    Place a Bid
                  </Button>
                </span>
              </Tooltip>
            </StyledCardContent>
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
