import React, { useState, useEffect, useContext } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import WalletContext from "../../store/WalletContext";
import { Bets } from '../../constants/races';
import './WinnersPopupComponent.scss';


interface LoadingPopupIntf {
  loadPopup: boolean;
  raceId: number;
  closePopup: () => void;
}

interface WinnerIntf {
  betType: Bets;
  winners: {name: string, amount: number}[];
}

const mapBetType = (type: number) => {
  switch (type) {
    case 0:
      return Bets.Straight;
    case 1:
      return Bets.Place;
    case 2:
      return Bets.Show;
  }
  return Bets.Straight;
}


const WinnersPopupComponent: React.FC<LoadingPopupIntf> = ({loadPopup, raceId, closePopup}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [winners, setWinners] = useState<WinnerIntf[]>([]);
  const { contract } = useContext(WalletContext);

  const getUserName = async(userId: number) => {
    const name = await contract.getUsername(userId);
    return name;
  }

  const createWinnerMap = async(races: any, raceId: number) => {
    const winners: WinnerIntf[] = [];
    let winner = {} as any;
    for(let i = 0; i < races.length; i++) {
      if(parseInt(races[i].raceId) === raceId) {
        const betType = mapBetType(races[i].betType);
        const winningPrize = (parseInt(races[i].winningPrize) / 10**18);
        if (winningPrize > 0) {
          const name = await getUserName(parseInt(races[i].userId));
          if(winner[betType]) {
            winner[betType].push({ name: name, amount: winningPrize });
          } else {
            winner[betType] = [{ name: name, amount: winningPrize }];
          }
        }
      }
    }
    for(const key in winner) {
      winners.push({ betType: key as Bets, winners: winner[key] });
    }
    return winners;
  }

  const openPopup = async (raceId: number) => {
    const winners = await contract.getRaceBets(raceId);
    const mapped = await createWinnerMap(winners, raceId);
    setWinners(mapped);
    setIsLoading(true);
  };
  
  const close = () => {
    setIsLoading(false);
    closePopup();
  }
  useEffect(() => {
    if(loadPopup) {
      openPopup(raceId);
    } else {
      closePopup();
    }
  }, [loadPopup])

  return (
    <Dialog maxWidth="sm" fullWidth open={isLoading} onClose={close}>
        <DialogTitle>Winners of the Race</DialogTitle>
        <DialogContent>
          {winners.map((winner) => {
            return (
              <div key={winner.betType}>
                <Typography variant="subtitle1">Bet type: {winner.betType}</Typography>
                <Typography variant="subtitle1">Winners:</Typography>
                {winner.winners.map((w) => {
                  return(
                    <Typography key={w.name} variant="subtitle1">Name: {w.name}, Amount: {w.amount}</Typography>
                  );
                })}
              </div>
            )
          })}
          {!winners.length && <Typography variant="subtitle1" color="error">Sorry no one has won the race!</Typography>}
        </DialogContent>
      </Dialog>
  );
};

export default WinnersPopupComponent;
