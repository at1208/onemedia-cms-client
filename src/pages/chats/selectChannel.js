import React from 'react';
import { Grid, Card, Typography, Badge } from '@material-ui/core';
import DashboardLayout from '../../components/layout/dashboardLayout';
import ListItem from '@material-ui/core/ListItem';
import { getChannels } from '../../actions/channel';
import { useHistory } from 'react-router-dom';
import { isAuth, getCookie } from '../../actions/auth';
import { makeStyles } from '@material-ui/core/styles';
const id = isAuth() && isAuth()._id;

const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"30px 10px 30px 10px"
   },
   icon:{
     color:"#76ff03"
   },
  time:{
    fontSize:"10px",
    color:"grey"
  },
  button:{
    textTransform: "none",
    backgroundColor:"#3f51b5",
    width:"180px",
    fontWeight:800,
    height:"40px",
    color:"white",
    fontSize:"15px",
    '&:hover': {
              backgroundColor:"#3f51b5"
        },
  },
 channelName:{
   color:"black",
 },
 senderName:{
   fontSize:"15px",
   fontWeight:500,
   fontFamily:"sans-serif",
   paddingTop:"4px",
   lineHeight:"1.0"
 },
 message:{
   fontSize:"14px",
   fontFamily:"sans-serif",
   padding:"6px 3px 6px 3px",
   backgroundColor:"rgb(107 116 162 / 4%)"
 }
}));


const defaultProps = {
  color: 'secondary'
};


function Chats(){
  const history = useHistory();
  const classes = useStyles();
  const token = getCookie("token");
  const [channels, setChannels] = React.useState([]);

  React.useEffect(() => {
   getChannels(id, token)
     .then((value) => {
       setChannels(value)
     })
     .catch((err) => {
       console.log(err)
     })
  }, [history.location.pathname])

  const currentTab = path => {
     if(path === history.location.pathname){
       return true;
     }
     return false;
  }

  const channelsList = channels.map((item, i) => {
        return <div key={i}>

                <ListItem
                    selected={currentTab(`/chats/${item.channel_name}`)}
                    button
                    onClick={() => history.push(`/chats/${item.channel_name}?id=${item._id}`)}>
                    <Grid container>
                      <Grid item xs={10} sm={10} md={10} className={classes.channelName}>
                        <Typography variant="body1">{`#${item.channel_name}`}</Typography>
                      </Grid>
                      <Grid item xs={2} sm={2} md={2}>
                       <Badge badgeContent={item.unread} {...defaultProps} />
                      </Grid>
                    </Grid>

                 </ListItem>
              </div>
  })


  return <>
           <DashboardLayout page="channel" permission="read">
             <Grid container justify="flex-start" spacing={3}>
               <Grid item sm={6} md={3} xs={12}>
                 <Card  className={classes.cardRoot}>
                  <Typography variant="h6" align="center">Subscribed Channels</Typography>
                  <br />
                  {channelsList}
                 </Card>
               </Grid>
               <Grid item sm={6} md={6} xs={12}>
                 <Card>
                 </Card>
               </Grid>
             </Grid>
           </DashboardLayout>
         </>
}

export default Chats;
