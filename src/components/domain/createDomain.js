import React from 'react';
import { Grid,
         Button,
         TextField,
         Dialog,
         Typography,
         DialogActions,
         DialogContent,
         DialogTitle} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { getCookie } from '../../actions/auth';
import { createDomain  } from '../../actions/domain';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  dialogRoot:{
    // padding:"10px",

  },
  button:{
    textTransform: "none",
    backgroundColor:"#3f51b5",
    // width:"200px",
    color:"white",
    fontWeight:400,
    fontSize:"16px",
    '&:hover': {
              backgroundColor:"#3f51b5"
        },
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));


const CreateCategory = () => {
  const [open, setOpen] = React.useState(false);
  const token = getCookie("token")
  const classes = useStyles();

  const [domain, setDomain] = React.useState({
     name: "",
     url:"",
     success:"",
     error:""
  });



    const handleClickOpen = () => {
     setOpen(true);
    };


    const handleClose = () => {
      setOpen(false);
      setDomain({...domain,
        success: "",
        error: "",
        name:"",
        url:"" })
    };


  const handleChange = name => e => {
       switch (name) {
         case "name":
        setDomain({...domain,
          name: e.target.value })
           break;

         case "url":
        setDomain({...domain,
          url: e.target.value })
           break;
         default:

       }

  }

  const handleSubmit = (e) => {
     e.preventDefault();

     createDomain(domain, token)
       .then((value) => {
         setDomain({...domain, success: value.message, error: "", name:"", url:"" })
       })
       .catch((err) => {
          console.log(err)
         setDomain({...domain, error: err.error, success: ""  })
       })
  }


    return  <>
             <Grid container justify="center">
               <Button
                variant="contained"
                className={classes.button}
                onClick={handleClickOpen}
                color="primary">
                Add Domain
               </Button>
             </Grid>
             <Dialog open={open} onClose={handleClose} disableBackdropClick>
             <div className={classes.dialogRoot}>
              <form onSubmit={handleSubmit}>
              <DialogContent>
                <DialogTitle
                 id="customized-dialog-title"
                 onClose={handleClose}
                 disableTypography
                 className={classes.root}>
                <Typography variant="h6">Add a new domain</Typography>
                  {open ? (
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      className={classes.closeButton}
                    >
                      <CloseIcon />
                    </IconButton>
                  ) : null}
                </DialogTitle>
                <Grid container justify="center" spacing={3}>
                  <Grid item sm={12} md={12} xs={12}>
                     <div className={classes.errorContainer}>
                      {domain.success && <Alert severity="success">{domain.success}</Alert>}
                      {domain.error && <Alert severity="error">{domain.error}</Alert>}
                     </div>
                     <br />
                       <Grid container spacing={3}>
                         <Grid item xs={12} sm={12} md={12}>
                           <TextField
                            fullWidth
                            onChange={handleChange("name")}
                            variant="outlined"
                            label="Domain name" />
                         </Grid>
                         <Grid item xs={12} sm={12} md={12}>
                           <TextField
                            fullWidth
                            placeholder="http://example.com"
                            onChange={handleChange("url")}
                            variant="outlined"
                            />
                         </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <br />
              </DialogContent>
              <DialogActions>
                <Grid container justify="center">
                  <Button
                    variant="contained"
                    className={classes.button}
                    type="submit">
                    Submit
                  </Button>
                </Grid>
              </DialogActions>
             </form>
            </div>
            </Dialog>
            </>
}

export default CreateCategory;
