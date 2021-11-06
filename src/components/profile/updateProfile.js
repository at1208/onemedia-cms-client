import React from 'react';
import { Button,
         Grid,
         Dialog,
         DialogActions,
         DialogContent} from '@material-ui/core';
import { getEmployee } from '../../actions/employee';
import { getCookie } from '../../actions/auth';
import { createChannel } from '../../actions/channel';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  dialogRoot:{
    padding:"10px"
  },
  button:{
    textTransform: "none",
    backgroundColor:"#3f51b5",
    width:"200px",
    color:"white",
    padding:"10px",
    fontWeight:800,
    height:"40px",
    fontSize:"15px",
    '&:hover': {
              backgroundColor:"#3f51b5"
        },
  }
}));


const UpdateProfile = ({ pageReload }) => {
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = React.useState()
  const token = getCookie("token")
  const classes = useStyles();
  const [channel, setChannel] = React.useState({
        channel_name:"",
        members:[],
        admins:[],
        error:"",
        success:"",
        isLoading:false
      })

  const handleClickOpen = () => {
   setOpen(true);
  };

  React.useEffect(() => {
      getEmployee(token)
        .then((value) => {
          setEmployees(value.employees)
        })
        .catch((err) => {
          console.log(err)
        })
  }, [])



  const handleClose = () => {
   setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setChannel({...channel, isLoading:true});
    createChannel(channel, token)
      .then((value) => {
        setChannel({...channel, success:value.message, isLoading:false, channel_name:"", members:[]});
        setOpen(false);

      })
      .catch((err) => {
        setChannel({...channel, isLoading:false, error: err.error});
      })
  }

    return  <>
    <br />
             <Grid container justify="center">

               <Button
                variant="contained"
                className={classes.button}
                onClick={handleClickOpen}
                color="primary"
                >
                 Update Profile
               </Button>
             </Grid>
             <Dialog open={open} onClose={handleClose} >
             <div className={classes.dialogRoot}>

             <form onSubmit={handleSubmit}>
              <DialogContent>
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

export default UpdateProfile;
