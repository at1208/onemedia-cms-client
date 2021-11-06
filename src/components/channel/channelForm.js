import React from 'react';
import { Button,
         TextField,
         Grid,
         Dialog,
         DialogActions,
         DialogContent,
         DialogTitle } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getEmployee } from '../../actions/employee';
import { isAuth } from '../../actions/auth';
import { createChannel } from '../../actions/channel';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { getCookie } from '../../actions/auth';
const id = isAuth() && isAuth()._id;


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


const ChannelForm = ({ pageReload }) => {
  const [open, setOpen] = React.useState(false);
  const token = getCookie("token")
  const classes = useStyles();
  const [employees, setEmployees] = React.useState([]);
  const [reload, setReload] = React.useState(false);
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

  React.useEffect(() => {
    pageReload(reload)
  }, [reload])

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
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err)
        setChannel({...channel, isLoading:false, error: err.error});
      })
  }

  const handleChange = (e) => {
      setChannel({...channel, channel_name: e.target.value, admins:[id] })
  }
    return  <>
             <Grid container justify="center">
               <Button
                variant="contained"
                className={classes.button}
                onClick={handleClickOpen}
                color="primary"
                >
                  Create Channel
               </Button>
             </Grid>
             <Dialog open={open} onClose={handleClose} >
             <div className={classes.dialogRoot}>
             {channel.success && <Alert severity="success">{channel.success}</Alert>}
             {channel.error && <Alert severity="error">{channel.error}</Alert>}
             <form onSubmit={handleSubmit}>
              <DialogTitle >Create a New Channel</DialogTitle>
              <DialogContent>
                <Grid container justify="center" spacing={3}>
                  <Grid item xs={12} md={12} sm={12}>
                    <TextField
                      variant="outlined"
                      onChange={handleChange}
                      value={channel.channel_name}
                      label="Channel name"
                      fullWidth />
                  </Grid>
                  <Grid item xs={12} md={12} sm={12}>
                  <Autocomplete
                     multiple
                     onChange={(event, newValue) => {
                       if(newValue){
                         let filterValue = newValue.map((member, i) => {
                           return member._id
                         })
                         setChannel({...channel, members: filterValue });
                       }
                      }}
                     options={employees || ""}
                     getOptionLabel={(option) => option.first_name + " " + option.last_name}
                     style={{ width: "100%" }}
                     renderInput={(params) => <TextField {...params} label="Members" variant="outlined" value={channel.members} />}
                   />
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

export default ChannelForm;
