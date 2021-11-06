import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteTask } from '../../actions/task';
import { getCookie } from '../../actions/auth';

export default function DeleteModal({ id }) {
  const [open, setOpen] = React.useState(false);
  const token = getCookie("token")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = name => e => {
    if(name === "delete"){
      return (
        deleteTask(id, token)
          .then(response => {
            setTimeout(() => {
              setOpen(false);
            }, 1000)
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      )
    }
   if(name === "cancel"){
       setOpen(false);
   }
  };

  return (
    <div>
      <Button
          size="large"
          variant="contained"
          color="secondary"
          onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Deleting Task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to Delete this Task ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose("cancel")} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose("delete")} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
