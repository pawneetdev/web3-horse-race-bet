import { Button, Dialog, DialogTitle, DialogContent, Alert, DialogActions, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Warning from '@mui/icons-material/Warning';
import { BetIntf } from '../BidComponent/BidComponent';

interface BidDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bidType: string;
  horse: string;
  onBidTypeChange: (event: SelectChangeEvent<{ value: any }>) => void;
  onHorseChange: (event: SelectChangeEvent<{ value: any }>) => void;
  onBidSubmit: () => void;
  dialogData: BetIntf;
}

const DialogComponent: React.FC<BidDialogProps> = function ({
  isOpen,
  onClose,
  bidType,
  horse,
  onBidTypeChange,
  onHorseChange,
  onBidSubmit,
  dialogData
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Place a Bid</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <label style={{padding: '10px 0'}} htmlFor="bid-type-label">Bid type</label>
            <Select
              labelId="bid-type-label"
              value={bidType as any}
              onChange={onBidTypeChange}
            >
              { dialogData?.betTypes?.map((bet) => {
                  return (<MenuItem key={bet} value={bet}>{bet}</MenuItem>)
              }) }
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <label style={{padding: '10px 0'}} htmlFor="horse-type-label">Select horse</label>
            <Select
              labelId="horse-type-label"
              value={horse as any}
              onChange={onHorseChange}
            >
              { dialogData?.horses?.map((horse) => {
                return (
                  <MenuItem key={ horse.name } value={horse.id}>{horse.name}</MenuItem>
                )
              }) }
            </Select>
            <Alert icon={<Warning />} severity="warning" style={{ marginTop: '10px', height: '50px', backgroundColor: 'orange', color: 'red' }}>
              You will be charged 50 RACE tokens!
            </Alert>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onBidSubmit} variant="contained" disabled={!bidType || !horse}>
            Submit Bid
          </Button>
        </DialogActions>
    </Dialog>
  )
}
export default DialogComponent;