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
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { createCategory } from '../../actions/category';
import { getCookie } from '../../actions/auth';
import { getDomains  } from '../../actions/domain';
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
  const [domains, setDomains] = React.useState();
  const [category, setCategory] = React.useState({
     name: "",
     domain:"",
     success:"",
     error:""
  });

  React.useEffect(() => {
       getDomains(token)
       .then(response => {
         setDomains(response)
       })
       .catch(err => {
         console.log(err)
       })
  }, [])

    const handleClickOpen = () => {
     setOpen(true);
    };


    const handleClose = () => {
      setOpen(false);
      setCategory({...category,
        success: "",
        error: "",
        name:"",
        domain:"" })
    };


  const handleChange = e => {
    setCategory({...category, name: e.target.value })
  }

  const handleSubmit = (e) => {
     e.preventDefault();

     createCategory(category, token)
       .then((value) => {
         setCategory({...category, success: value.message, error: "", name:"", domain:"" })
       })
       .catch((err) => {
         setCategory({...category, error: err.error, success: ""  })
       })
  }


    return  <>
             <Grid container justify="center">
               <Button
                variant="contained"
                className={classes.button}
                onClick={handleClickOpen}
                color="primary">
                 Add Category
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
                <Typography variant="h6">Add a new category</Typography>
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
                      {category.success && <Alert severity="success">{category.success}</Alert>}
                      {category.error && <Alert severity="error">{category.error}</Alert>}
                     </div>
                     <br />
                       <Grid container spacing={3}>
                         <Grid item xs={12} sm={12} md={12}>
                           <TextField
                            fullWidth
                            onChange={handleChange}
                            variant="outlined"
                            label="Category name" />
                         </Grid>
                         <Grid item xs={12} sm={12} md={12}>
                         <Autocomplete
                            onChange={(event, newValue) => {
                              if(newValue){
                                   setCategory({...category, domain: newValue._id})
                              }
                             }}
                            options={domains}
                            getOptionLabel={(option) => option.name}
                            style={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Domain" variant="outlined"/>}
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
