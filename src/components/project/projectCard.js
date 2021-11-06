import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { taskCountByProject } from '../../actions/task';
import { getCookie } from '../../actions/auth';
import {
  Button,
  Box,
  Card as MuiCard,
  CardMedia as MuiCardMedia,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Typography as MuiTypography,
} from "@material-ui/core";
import { AvatarGroup as MuiAvatarGroup } from "@material-ui/lab";
import DeleteDialog from './deleteModal';
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from "@material-ui/system";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '../core/avatar';


const Card = styled(MuiCard)(spacing);

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  color: black;
  margin-bottom: 10px;
`;
const AvatarGroup = styled(MuiAvatarGroup)`
  margin-left: 10px;
`;


const useStyles = makeStyles((theme) => ({
  cardRoot:{
    padding:"10px"
  },
  chipContainer:{
    padding:"0px 15px 15px 15px"
  }

}));


function Project({ image,  project, edit }) {
    const [taskCount, setTaskCount] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamLeader, setTeamLeader] = useState();

    const classes = useStyles();
    const token = getCookie("token")

    useEffect(() => {
       taskCountByProject(project._id, token)
         .then(value => {
            setTaskCount(value)
         })
         .catch(err => {
           console.log(err)
         })
    }, []);

    useEffect(() => {
      if(project){
        setTeamMembers(project.team_members.filter(val => val._id !== project.team_leader._id).slice(0,3))
        setTeamLeader(project.team_leader);
      }
    }, [project])

    const handleClickMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = (name)  => {
      if(name === "edit"){
         edit(project)
      }
      setAnchorEl(null);
    };




  return (
    <Card mb={6}>
      {image ? <CardMedia image={image} title="Contemplative Reptile" /> : null}
      <Card className={classes.cardRoot}>
       <Grid container>
         <Grid item xs={11} sm={11} md={11}>
         <Typography gutterBottom variant="h6" component="h2">
           {project.name}
         </Typography>
         </Grid>
         <Grid item xs={1} sm={1} md={1}>
         <MoreVertIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickMenu}/>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
              <MenuItem onClick={() => handleCloseMenu("edit")}>
                <Button size="small"   color="primary">
                  Edit
                </Button>
              </MenuItem>
              <MenuItem>
                <DeleteDialog id={project._id}/>
              </MenuItem>
          </Menu>
         </Grid>
       </Grid>
        {taskCount && <Grid container spacing={3} className={classes.chipContainer}>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Chip label={<>Open task: {taskCount.open}</>} className={classes.openChip} />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Chip label={<>Done task: {taskCount.done}</>} className={classes.doneChip} />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Chip label={<>Priority: {project.priority}</>} className={classes.doneChip} />
          </Grid>
        </Grid>}
        <Typography mb={4} component="body1">
          {project.description}
        </Typography>
          <br /><br />
          <Grid container justify="flex-start">
            <Grid item sm={3} xs={4} md={3}>
              <Box pl={1}>
                <small>Team Lead</small>
                 <Avatar
                   name={teamLeader && teamLeader.full_name}
                   src={teamLeader && teamLeader.headshot_url}
                   size={35}
                   textSize={13} />
              </Box>
            </Grid>
            <Grid item sm={9} xs={8} md={9}>
              <Box pl={1}>
                 <small>Team members</small>
                <AvatarGroup max={3}>
                 {teamMembers.map((emp, i) => {
                   return <Avatar
                            name={emp.full_name}
                            src={emp.headshot_url}
                            size={35}
                            textSize={13} />
                 })}
                </AvatarGroup>
              </Box>
            </Grid>
          </Grid>
           <br />
           <Divider />
          <Box pl={1}>
           <a href={project.domain && project.domain.name}>Learn more</a>
          </Box>


      </Card>
    </Card>
  );
}

export default Project;
