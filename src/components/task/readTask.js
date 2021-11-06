import React from 'react';
import {  Grid,
          Button,
          Box,
          TextField,
          Select,
          FormControl,
          InputLabel,
          MenuItem,
          Dialog,
          DialogActions,
          Typography,
          DialogContent,
          DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getProjects } from '../../actions/project';
import { getEmployee, checkModulePermission } from '../../actions/employee';
import { updateTask } from '../../actions/task';
import { isAuth, getCookie } from '../../actions/auth';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { ToastContainer, toast } from 'react-toastify';
import {
  RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";
import DeleteTask from './deleteTask';

const id = isAuth() && isAuth()._id;



const useStyles = makeStyles((theme) => ({
  dialogRoot:{
    // padding:"10px",
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
  formControl: {
      // margin: theme.spacing(1),
      minWidth: 120,
      width:"100%"
    }
}));


const ReadTask = ({ editTask, reload }) => {
  const classes = useStyles();
  const [projects, setProjects] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [reloadAPI, setReloadAPI] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const token = getCookie("token")


  const handleClickOpen = () => {
   setOpen(true);
  };


  const handleClose = () => {
   setOpen(false);
  };

  const [task, setTask] = React.useState({
     title:"",
     owner:id,
     description:"",
     status:"",
     project_id:"",
     assignee:"",
     follower:"",
     deadline:"",
     error:"",
     success:"",
     isLoading:false
  })


  React.useEffect(() => {
    getProjects(token)
      .then((value) => {
        setProjects(value.projects)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  React.useEffect(() => {
    setTask({...task,
      title:editTask.title,
      status:editTask.status,
      description:editTask.description,
      project_id: editTask.project_id,
      assignee: editTask.assignee,
      follower:editTask.follower })
  }, [open])

  React.useEffect(() => {
      getEmployee(token)
        .then((value) => {
          setEmployees(value.employees)
        })
        .catch((err) => {
          console.log(err)
        })
  }, [])




  const handleChange = type => e => {
      switch (type) {
         case "title":
           setTask({...task, title: e.target.value })
           break;
         case "description":
              setTask({...task, description: e.target.value })
           break;
         case "deadline":
              setTask({...task, deadline: e.target.value })
           break;
        default:

      }
  }


  const handleSubmit = (e) => {
     e.preventDefault();
     setTask({...task, isLoading: true })
     updateTask(editTask._id, task, token)
       .then((value) => {
         toast.success(value.message);
         setTask({...task,
           title:"",
           owner: "",
           description:"",
           project_id:"",
           assignee:"",
           follower:"",
           deadline:"",
           error:"",
           success:"",
           isLoading:false
         })
          setReloadAPI(!reloadAPI)
          reload(reloadAPI)
          handleClose()
       })
       .catch((err) => {
         toast.error(err.error)
         setTask({...task,
           error:err.error,
           success:"",
           isLoading:false})
       })
  }



    return  <>
             <ToastContainer />
             <Grid container justify="center">
             <Box>
               <IconButton aria-label="details"   onClick={handleClickOpen}>
                 <RemoveRedEyeIcon />
               </IconButton>
             </Box>
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
              <Typography variant="h6">Task</Typography>
                {open ? (
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    className={classes.closeButton}>
                    <CloseIcon />
                  </IconButton>
                ) : null}
              </DialogTitle>
              <Grid container justify="center" spacing={3}>
                <Grid item sm={12} md={12} xs={12}>

                  <br />
                   <form onSubmit={handleSubmit}>
                     <Grid container spacing={3}>
                       <Grid item xs={12} sm={12} md={12}>
                         <TextField
                          fullWidth
                          disabled
                          size="small"
                          value={task.title}
                          onChange={handleChange("title")}
                          label="Title" />
                       </Grid>
                       <Grid item xs={12} sm={12} md={12}>
                         <TextField
                          fullWidth
                          disabled
                          multiline
                          size="small"
                         
                          onChange={handleChange("description")}
                          value={task.description}
                          label="Description" />
                       </Grid>
                       <Grid item xs={12} sm={12} md={12}>
                         <Autocomplete
                            disabled
                            size="small"
                            defaultValue={task.project_id}
                            onChange={(e, val) => {
                               if(val){
                                 setTask({...task, project_id: val._id })
                               }
                             }}
                            disabled
                            options={projects}
                            getOptionLabel={(option) => option.name}
                            style={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Project" />}
                          />
                       </Grid>
                       <Grid item xs={12} sm={12} md={12}>
                       <FormControl  size="small" disabled className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={task.status}
                          onChange={(e) => setTask({...task, status: e.target.value })}
                          label="Status"
                        >
                          <MenuItem value={'Open'}>Open</MenuItem>
                          <MenuItem value={'Closed'}>Closed</MenuItem>
                          <MenuItem value={'Done'}>Done</MenuItem>
                        </Select>
                      </FormControl>
                       </Grid>
                       <Grid item xs={12} sm={12} md={12}>
                         <Autocomplete
                            size="small"
                            defaultValue={task.assignee}
                            onChange={(e, val) => {
                               if(val){
                                 setTask({...task, assignee: val._id })
                               }
                             }}
                            disabled
                            options={employees}
                            getOptionLabel={(option) => option.full_name}
                            style={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Assignee"  />}
                          />
                       </Grid>
                       <Grid item xs={12} sm={12} md={12}>
                        {<Autocomplete
                            size="small"
                            defaultValue={task.follower}
                            onChange={(e, val) => {
                                if(val){
                                  let filterValue = val.map((member, i) => {
                                    return member._id
                                  })
                                  setTask({...task, follower: filterValue });
                                }
                             }}
                            disabled
                            options={employees}
                            getOptionLabel={(option) => option.full_name}
                            style={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Reporter"   />}
                          />}
                       </Grid>
                       {/*<Grid item xs={12} sm={12} md={12}>
                       <TextField
                         variant="outlined"
                         id="date"
                         label="Deadline"
                         type="date"
                         fullWidth
                         onChange={handleChange("deadline")}
                         className={classes.textField}
                         InputLabelProps={{
                           shrink: true,
                         }} />
                       </Grid>*/}

                     </Grid>
                     </form>

                </Grid>
              </Grid>
              </DialogContent>

             </form>
            </div>
            </Dialog>
            </>
}

export default ReadTask;
