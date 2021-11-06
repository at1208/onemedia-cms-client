import React from 'react';
import { Button,
         TextField,
         Grid,
         Dialog,
         DialogActions,
         DialogContent } from '@material-ui/core';
import { createDesignation } from '../../actions/designation'
import { getCookie } from '../../actions/auth';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  dialogRoot:{
    padding:" "
  },
  cardRoot:{
    minHeight:"100px",
    padding:""
  },
  close:{
    position:"absolute",
    right:'5%'
  },
  button:{
    background: '#6387ED 0% 0% no-repeat padding-box',
    borderRadius: '8px',
    opacity: 1,
    // width: '100%',
    fontWeight: '500',
    height: '49px',
    textTransform: 'none',
    color: 'white',
    '&:hover': {
      fontWeight: '500',
      background: '#6387ED 0% 0% no-repeat padding-box',
      color: 'white',
    },
  },
}));



const CreateDesignation = () => {
  const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const token = getCookie("token")

  const [designation, setDesignation] = React.useState({
     designationName: "",
     isLoading:false,
     success:"",
     error:""
  })

  const handleClickOpen = () => {
   setOpen(true);
  };


  const handleClose = () => {
   setOpen(false);
  };


  const handleSubmit = (e) => {
      e.preventDefault();
      setDesignation({...designation, isLoading:true})
      createDesignation(designation, token)
        .then(res => {
          setDesignation({...designation, isLoading:false, success:res.message, error:"", designationName:"" })
        })
        .catch((err) => {
          setDesignation({...designation, isLoading:false, error: err.error, success:"" })
        })
  }

  const handleChange = (e) => {
      setDesignation({...designation, designationName:e.target.value})
  }
    return  <>
             <Grid container justify="center">
               <Button
                variant="contained"
                className={classes.button}
                onClick={handleClickOpen}
                color="primary"
                >
                  Create Designation
               </Button>
             </Grid>
             <Dialog open={open} onClose={handleClose} >
             <div className={classes.dialogRoot}>
             <form onSubmit={handleSubmit}>
              <DialogContent>
              <Grid container spacing={3} justify="center">
                <Grid item md={12} xm={12} sm={12}>
                {designation.success && <Alert severity="success">{designation.success}</Alert>}
                {designation.error && <Alert severity="error">{designation.error}</Alert>}
                <br />
                <TextField
                  size="small"
                  onChange={handleChange}
                  value={designation.designationName}
                  label="Designation name"
                  variant="outlined"
                  fullWidth />
                </Grid>
              </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </DialogActions>
              </form>
            </div>
            </Dialog>
            </>
}

export default CreateDesignation;
