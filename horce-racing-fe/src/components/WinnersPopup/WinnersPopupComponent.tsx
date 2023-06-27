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
  winners: string[];
}

const WinnersPopupComponent: React.FC<LoadingPopupIntf> = ({loadPopup, raceId, closePopup}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [winners, setWinners] = useState<WinnerIntf[]>([]);
  const { contract } = useContext(WalletContext)
  const openPopup = async (raceId: number) => {
    // const winners = await contract.getRaceBets(raceId);
    const winners: WinnerIntf[] = [
      {
        betType: Bets.Show,
        winners: ['Robin', 'Samson']
      },
      {
        betType: Bets.Place,
        winners: ['Robin']
      }
    ]
    setWinners(winners);
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
                <Typography variant="subtitle1">Winners: {winner.winners.join(', ')}</Typography>
              </div>
            )
          })}
        </DialogContent>
      </Dialog>
  );
};

export default WinnersPopupComponent;
