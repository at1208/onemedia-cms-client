import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({ status }) {
  const [open, setOpen] = React.useState(false);


  React.useEffect(() => {
    if(!status){
          setOpen(true)
    }else{
      setOpen(false)
    }
  },[status])

 
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`You're offline`}</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained" onClick={() => window.location.reload()}>
            Reload the page
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
