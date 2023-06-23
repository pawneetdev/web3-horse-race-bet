import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface BidDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bidType: string;
  horse: string;
  onBidTypeChange: (event: SelectChangeEvent<{ value: any }>) => void;
  onHorseChange: (event: SelectChangeEvent<{ value: any }>) => void;
  onBidSubmit: () => void;
}

const DialogComponent: React.FC<BidDialogProps> = function ({
  isOpen,
  onClose,
  bidType,
  horse,
  onBidTypeChange,
  onHorseChange,
  onBidSubmit
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
              <MenuItem value="straight">Straight</MenuItem>
              <MenuItem value="place">Place</MenuItem>
              <MenuItem value="show">Show</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <label style={{padding: '10px 0'}} htmlFor="horse-type-label">Select horse</label>
            <Select
              labelId="horse-type-label"
              value={horse as any}
              onChange={onHorseChange}
            >
              <MenuItem value="Horse1">Horse1</MenuItem>
              <MenuItem value="Horse2">Horse2</MenuItem>
              <MenuItem value="Horse3">Horse3</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onBidSubmit} variant="contained" disabled={!bidType}>
            Submit Bid
          </Button>
        </DialogActions>
    </Dialog>
  )
}
export default DialogComponent;