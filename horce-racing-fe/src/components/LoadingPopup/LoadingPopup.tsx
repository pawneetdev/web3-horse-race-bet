import React, { useState, useEffect } from 'react';
import { CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';

interface LoadingPopupIntf {
  loadPopup: boolean;
}

const LoadingPopup: React.FC<LoadingPopupIntf> = ({loadPopup}) => {
  const [isLoading, setIsLoading] = useState(false);
  const openPopup = () => {
    setIsLoading(true);
  };
  const closePopup = () => {
    setIsLoading(false);
  }
  useEffect(() => {
    if(loadPopup) {
      openPopup();
    } else {
      closePopup();
    }
  }, [loadPopup])

  return (
    <div>
      <Dialog open={isLoading} onClose={closePopup}>
        <DialogTitle>Transaction in Progress</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <div>
              <CircularProgress />
              <p>Please wait while the transaction is being processed...</p>
            </div>
          ) : (
            <p>Transaction verification completed</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoadingPopup;
