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
import { getCookie } from '../../actions/auth';
import { updateProject } from '../../actions/project';
import { getEmployee } from '../../actions/employee';
import { getDomains  } from '../../actions/domain';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
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


const EditProject = ({ status, modal, editProject }) => {
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const token = getCookie("token")
  const classes = useStyles();
  const [project, setProject] = React.useState({
     name:"",
     description:"",
     team_leader:"",
     team_members:"",
     domain:"",
     start_date:"",
     end_date:"",
     error:"",
     success:"",
     isLoading:false
  })
  const [domains, setDomains] = React.useState();

  React.useEffect(() => {
       getDomains(token)
       .then(response => {
         setDomains(response)
       })
       .catch(err => {
         console.log(err)
       })
  }, [])



  const handleClose = () => {
   setOpen(false);
   setProject({ ...project,
     name:"",
     description:"",
     team_leader:"",
     team_members:"",
     start_date:"",
     end_date:"",
     success:"",
     error:""
   })

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
       status(open)
    },[open])

    React.useEffect(() => {
      setOpen(modal)
    },[modal])

   React.useEffect(() => {
      if(editProject){

        setProject({...project, name: editProject.name,
             description: editProject.description,
             team_leader: editProject.team_leader,
             team_members: editProject.team_members,
             domain: editProject.domain
         })
      }
  }, [open])



  const handleChange = type => e => {
      switch (type) {
         case "name":
           setProject({...project, name: e.target.value })
           break;
         case "description":
              setProject({...project, description: e.target.value })
           break;
         case "start_date":
              setProject({...project, start_date: e.target.value })
           break;
         case "end_date":
              setProject({...project, end_date: e.target.value })
           break;
         case "priority":
               setProject({...project, priority: e.target.value })
            break;
        default:

      }
  }

  const handleSubmit = (e) => {
     e.preventDefault();
     setProject({ ...project,
       isLoading:true,
     })
     updateProject(editProject._id, project, token)
       .then((value) => {
         setProject({ ...project,
           name:"",
           description:"",
           team_leader:"",
           team_members:"",
           start_date:"",
           end_date:"",
           success:value.message,
           error:""
         })
       })
       .catch((err) => {
         setProject({ ...project,
           success:"",
           isLoading:false,
           error:err.error
         })
       })
  }




    return  <>
             <Dialog open={open} onClose={handleClose} disableBackdropClick>
             <div className={classes.dialogRoot}>
              <form onSubmit={handleSubmit}>
              <DialogContent>
                <DialogTitle
                 id="customized-dialog-title"
                 onClose={handleClose}
                 disableTypography
                 className={classes.root}>
                <Typography variant="h6">Add a new project</Typography>
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
                      {project.success && <Alert severity="success">{project.success}</Alert>}
                      {project.error && <Alert severity="error">{project.error}</Alert>}
                     </div>
                     <br />

                       <Grid container spacing={3}>
                         <Grid item xs={12} sm={12} md={12}>
                           <TextField
                            fullWidth
                            value={project.name}
                            onChange={handleChange("name")}
                            variant="outlined"
                            label="Project name" />
                         </Grid>
                         <Grid item xs={12} sm={12} md={12}>
                           <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={project.description}
                            onChange={handleChange("description")}
                            variant="outlined"
                            label="Description" />
                         </Grid>

                         <Grid item xs={12} sm={12} md={12}>
                           <Autocomplete
                              onChange={(e, val) => {
                                 if(val){
                                   setProject({...project, team_leader: val._id })
                                 }
                               }}
                              defaultValue={project.team_leader}
                              options={employees}
                              getOptionLabel={(option) => option.full_name}
                              style={{ width: "100%" }}
                              renderInput={(params) => <TextField {...params} label="Team leader" variant="outlined"/>}
                            />
                         </Grid>
                         <Grid item xs={12} sm={12} md={12}>
                         <Autocomplete
                           multiple
                            defaultValue={project.team_members}
                            onChange={(e, val) => {
                              if(val){
                                let filterValue = val.map((member, i) => {
                                  return member._id
                                })
                                setProject({...project, team_members: filterValue });
                              }
                             }}
                            options={employees}
                            getOptionLabel={(option) => option.full_name}
                            style={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Team members" variant="outlined" />}
                          />
                         </Grid>
                         <Grid item xs={12} sm={12} md={12}>
                         <Autocomplete
                         defaultValue={project.domain}
                            onChange={(event, newValue) => {
                              if(newValue){
                                   setProject({...project, domain: newValue._id})
                              }
                             }}

                            options={domains}
                            getOptionLabel={(option) => option.name}
                            style={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Domain" variant="outlined"/>}
                          />
                         </Grid>
                         {/*<Grid item xs={12} sm={6} md={6}>
                         <TextField
                           variant="outlined"
                           id="date"
                           label="Start date"
                           type="date"
                           fullWidth
                           onChange={handleChange("start_date")}
                           defaultValue={project.start_date}
                           className={classes.textField}
                           InputLabelProps={{
                             shrink: true,
                           }} />
                         </Grid>
                         <Grid item xs={12} sm={6} md={6}>
                         <TextField
                           variant="outlined"
                           id="date"
                           fullWidth
                           label="End date"
                           type="date"
                           onChange={handleChange("end_date")}
                           defaultValue={project.end_date}
                           className={classes.textField}
                           InputLabelProps={{
                             shrink: true,
                           }} />
                         </Grid>*/}
                         </Grid>
                  </Grid>
                </Grid>
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

export default EditProject;
