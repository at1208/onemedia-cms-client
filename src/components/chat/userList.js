import React from 'react';
import { Link } from 'react-router-dom';
import { getChatEmployee } from '../../actions/employee';
import { getCookie, isAuth } from '../../actions/auth';
import Avatar from '../core/avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography, IconButton } from '@material-ui/core';
import socket from '../../utils/socketio';
import SearchBar from "material-ui-search-bar";


const useStyles = makeStyles((theme) => ({
  name:{
    color:"black"
  },
  buttonRoot:{
    padding:"7px"
  },
  online:{
    position:"absolute",
    top:"38px",
    right:"10px",
    width: "9px",
    height: "9px",
    background: "#1fe61f",
    borderRadius: "50%"
  },
  offline:{
    position:"absolute",
    top:"38px",
    right:"10px",
    width: "9px",
    height: "9px",
    background: "#c9c9c9",
    borderRadius: "50%"
  },
  userListing:{
    height:"75vh",
    backgroundColor:"white",
    overflowY:"scroll"
  }
}));

const UsersList = ({ url, getOnlineUsers }) => {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const [onlineUsers, setOnlineUsers] = React.useState([]);
  const [offlineUsers, setOfflineUsers] = React.useState([]);
  const [selectedSocket, setSelectedSocket] = React.useState();
  const [combinedUsers, setCombinedUsers] = React.useState([]);
  const token = getCookie("token");

  React.useEffect(() => {
    socket.on("connection", (response) => {
       setOnlineUsers(response.onlineUsers)
       getOnlineUsers(response.onlineUsers)
    })
    socket.on("disconnected", (response) => {
       setOnlineUsers(response.onlineUsers)
       getOnlineUsers(response.onlineUsers)
    })
    socket.emit("urlChanged", { url });
    socket.on("urlChanged", (response) => {
       setOnlineUsers(response.onlineUsers)
       getOnlineUsers(response.onlineUsers)
    })
    socket.on("online", (response) => {
       setOnlineUsers(response.onlineUsers)
       getOnlineUsers(response.onlineUsers)
    })
  }, [])

  React.useEffect(() => {
    (async () => {
       let usersList = await getChatEmployee(token);
        setUsers(usersList.employees)
    })()
  }, [])

  React.useEffect(() => {
    setReload(!reload);
  }, [])



  React.useEffect(() => {
    if(users){
      var  offlineUsersList = users;
      for(let online = 0; online<onlineUsers.length; online++){
        offlineUsersList = offlineUsersList.filter(user =>  user._id !== onlineUsers[online]._id);
      }
      setCombinedUsers([...onlineUsers, ...offlineUsersList])
      setOfflineUsers(offlineUsersList);
    }
  }, [onlineUsers, users])



 const handleChange = (val) => {
        if(val.length !== 0){
          setCombinedUsers(combinedUsers.filter((name) => name.full_name.toLowerCase().split(" ").join("").includes(val.toLowerCase().split(" ").join(""))))
        }else{
          var  offlineUsersList = users;
          for(let online = 0; online<onlineUsers.length; online++){
            offlineUsersList = offlineUsersList.filter(user =>  user._id !== onlineUsers[online]._id);
          }
          setCombinedUsers([...onlineUsers, ...offlineUsersList])
          setOfflineUsers(offlineUsersList);
        }
 }

  function UsersListing(){
     if(combinedUsers.length !==0){
      return combinedUsers.map((emp, i) => {
        if(emp._id !== (isAuth() && isAuth()._id)){
          if(emp.socketId){
            return <Link to={{ pathname: `/chats/private/${emp._id}`, state: { selectedReceiver: emp} }}>
                  <Box onClick={() => setSelectedSocket(emp)} >
                    <Grid container className={classes.selected}>
                      <Grid item>
                      <Box>
                        <div>
                        <IconButton className={classes.buttonRoot}>
                          <Avatar  name={emp.full_name} src={emp.headshot_url} size={37} textSize={20} />
                          <span className={classes.online}></span>
                        </IconButton>
                        </div>
                      </Box>
                      </Grid>
                      <Grid item>
                      <Box pt={2}>
                        <Typography variant="body2" className={classes.name}>
                           {emp.full_name}
                        </Typography>
                      </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  </Link>
          }else{
            return <Link to={{ pathname: `/chats/private/${emp._id}`,  state: { selectedReceiver: emp} }}>
                  <Box onClick={() => setSelectedSocket(emp)}>
                    <Grid container >
                      <Grid item>
                      <Box >
                      <div>
                      <IconButton className={classes.buttonRoot}>
                        <Avatar  name={emp.full_name} src={emp.headshot_url} size={37} textSize={20} />
                        <span className={classes.offline}></span>
                      </IconButton>
                      </div>
                      </Box>
                      </Grid>
                      <Grid item>
                      <Box pt={2}>
                        <Typography variant="body2" className={classes.name}>
                           {emp.full_name}
                        </Typography>
                      </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  </Link>
          }

        }
      })
     }else{
       return <>
             </>
     }
  }



  return <>
          <br />
          <SearchBar
            onChange={handleChange}
          />
          <br />
          <div className={classes.userListing}>
          <UsersListing />
          </div>
         </>
}

export default UsersList;
