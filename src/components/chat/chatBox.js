import React, { useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom'
import { Grid, IconButton, Card, Box, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import socket from '../../utils/socketio';
import { isAuth, getCookie } from '../../actions/auth';
import { Send } from 'react-feather';
import moment from 'moment';
import { Waypoint } from 'react-waypoint';
import Avatar from '../core/avatar';
import { getPrivateChats } from '../../actions/privateChat';
import UserListing from './sidebar';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles((theme) => ({
    displayMessage:{
      height: "65vh",
      padding:"20px 0px 0px 0px",
      // backgroundImage:"url(/chatbg.svg)",
      overflowY:"scroll"
    },
    space:{
      padding:"5px"
    },
    messageRoot:{
      padding:"0px 0px 0px 0px"
    },

    myMsgAlign:{
      textAlign:"right",
    },
    thereMsgAlign:{
        textAlign:"left",
    },
    myMsg:{
      padding:"10px",
      border: "1px solid #DDDDDD",
      opacity: 1,
      marginBottom:"10px",
      marginRight:"10px",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      borderRadius: "10px 10px 0px 10px",
    },
    thereMsg:{
      padding:"10px",
      marginLeft:"10px",
      borderRadius: "10px 10px 10px 0px",
      background: "#EEF3FF 0% 0% no-repeat padding-box",
      border: "1px solid #DDDDDD",
      opacity: 1
    },
    timestamp:{
      color:"rgb(58 64 88 / 50%)",
      fontSize:"11px",
    },
    msgContainer:{
      marginBottom:"15px"
    },
    msgEditor:{
      width:"100%",
     "& .MuiOutlinedInput-multiline":{
       backgroundColor:"white"
     }
   },

   receiver:{
   },
   editorForm:{
     [theme.breakpoints.down('xs')]: {
      position:"fixed",
      bottom:"10px",
      left:"10px",
      right:"10px"
     },
   },
   time:{
    fontSize:"9px",
    padding:"10px",
    color:"grey"
   },
   timespace:{
     padding:"5px 20px 0px 0px",

   }
}));


const Chat = ({ onlineUsers, match: { params: id, url }, location: { state: selectedReceiver } }) => {

  const classes = useStyles();
  const token = getCookie("token")
  const userId = isAuth() && isAuth()._id;
  const userPicture = isAuth() && isAuth().headshot_url;
  const userName  = isAuth() && isAuth().full_name;
  const [chatList, setChatList] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  var [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [autoScroll, setAutoScroll] = useState(true);
  const [receiverSocketId, setReceiverSocketId] = useState();
  const [receiver, setReceiver] = useState([]);
  const [typing, setTyping ] = React.useState({ status: false, msg: "" });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  var messageContainer = React.useRef();

  const [msg, setMsg] = useState({
         message: "",
         senderName: "",
         senderPicture:"",
         senderId: "",
         receiverId:"",
         receiverSocketId:"",
         timestamp: ""
})




   useEffect(() => {
       socket.on("receivePrivateMsg", (receiveMsg) => {
       if(selectedReceiver && isAuth()){
          if(selectedReceiver.selectedReceiver._id + isAuth()._id === receiveMsg.msg.msg.senderId + receiveMsg.msg.msg.receiverId){
             setChatList((prevState) => [...prevState, receiveMsg.msg.msg]);
          }
       }
       })

       socket.on("privateTypingResponse", (msg) => {
           setTyping({ status: true, msg: msg.msg });
           setTimeout(() => {
             setTyping({ status: false, msg: "" });
           }, 2000)
       });
   }, [])

   useEffect(() => {
      if(autoScroll){
          messageContainer.scrollIntoView()
      }
   }, [chatList])




   useEffect(() => {
    (async () => {
       let messages = await getPrivateChats(id.id, token);
        messages = messages.map((mssg) => {
            return {
              senderName:mssg.senderId.full_name,
              senderPicture: mssg.senderId.headshot_url,
              receiverId:mssg.receiverId._id,
              senderId:mssg.senderId._id,
              message: mssg.message,
              _id: mssg._id,
              timestamp: mssg.createdAt
            }
          })
       setChatList(messages)
    })()
  }, [id.id])


 useEffect(() => {
    if(onlineUsers.length>0){
        onlineUsers.filter(online => online._id === id.id);
    }
 }, [onlineUsers])


 useEffect(() => {
   setReceiver(selectedReceiver.selectedReceiver);
   setReceiverSocketId(selectedReceiver.selectedReceiver.socketId)
 }, [selectedReceiver, url])

const onEnter = async (e) => {
    setLoadMore(!loadMore);
  let loadMoreMessages =   await getPrivateChats(id.id, token, { skip: skip, limit: limit });
  loadMoreMessages = loadMoreMessages.map((mssg) => {
      return {
        senderName:mssg.senderId.full_name,
        senderPicture: mssg.senderId.headshot_url,
        message: mssg.message,
        timestamp: mssg.createdAt
      }
    })
    setChatList([...loadMoreMessages, ...chatList])
}



   useEffect(() => {
     setSkip(skip = skip+limit);
   }, [loadMore])


   const handleClick = (e) => {
       e.preventDefault();

       if(isAuth()._id === msg.senderId){
          setChatList((prevState) => [...prevState, msg]);
       }
       if(msg.message.length === 0) return;
       socket.emit("sendPrivateMsg", { msg });
       setMsg({
         message: "",
         senderName: "",
         senderEmail: "",
         senderPicture:"",
         readBy:"",
         senderId: "",
         channelId: "",
         timestamp: ""
       });
   }



   const handleChange = (e) => {
     setMsg({
       message: e.target.value,
       senderName: userName,
       senderPicture: userPicture,
       senderId: userId,
       receiverId: id.id,
       receiverSocketId:receiverSocketId,
       timestamp: new Date()
     })
     socket.emit("privateTyping", { senderName: userName  }, { socketId: receiverSocketId })
   }

   const handleWaypointEnter = () => {
      setAutoScroll(true)
   }

   const handleWaypointLeave = () => {
      setAutoScroll(false)
   }

  function ShowChatListMessages(){
    return chatList.map((chatMsg, i) => {
      return <div className={classes.msgContainer}>
                <div className={chatMsg.senderId === (isAuth() && isAuth()._id) ? classes.myMsgAlign: classes.thereMsgAlign}>
                  <span className={chatMsg.senderId === (isAuth() && isAuth()._id) ? classes.myMsg: classes.thereMsg}>
                   {chatMsg.message}
                  </span>
                    <div className={classes.timespace} />
                   <small className={classes.time}>{moment(chatMsg.timestamp).format("hh:mm a - M/D/Y")}</small>
                </div>


                <div className={classes.space}/>
            </div>
    })
  }


  return <>
            <Grid container justify="center">
              <Grid item sm={10} md={9} xs={12} lg={9}>
                <br />
                <Grid container className={classes.receiver} justify="space-between">
                  <Grid item sm={6} xs={6}>
                      <Grid container>
                        <Grid item>
                          {receiver && <Avatar name={receiver.full_name} src={receiver.headshot_url} size={40} textSize={15} />}
                        </Grid>
                        <Grid item>
                        <Box pt={0} pl={1}>
                          <Typography variant="body2">
                            {receiver.full_name}
                          </Typography>
                          {typing.status?<Typography variant="" align="center"><small>{typing.status && typing.msg}</small></Typography>:receiver.socketId !==undefined?<small>online</small>:""}
                        </Box>
                        </Grid>
                      </Grid>
                  </Grid>
                  {matches && <Grid item sm={6}>
                     <Grid container justify="space-between">
                       <Grid item>
                       </Grid>
                       <Grid item>
                          <UserListing />
                       </Grid>
                     </Grid>
                  </Grid>}
                </Grid>
                <br />
                <Card className={classes.displayMessage}>
                   {chatList.length >=10 && <Grid container justify="center">
                     <Grid>
                       <button onClick={onEnter}>
                        Load previous messages
                       </button>
                     </Grid>
                   </Grid>}
                  <ShowChatListMessages />
                  <div ref={(el) => messageContainer = el} id="scroll-message">
                    <Waypoint
                     onEnter={handleWaypointEnter}
                     onLeave={handleWaypointLeave}
                    />
                  </div>
                </Card>
              </Grid>
            </Grid>
            <br />
            <form onSubmit={handleClick} className={classes.editorForm}>
            <Grid container justify="center">
              <Grid item sm={9} md={8} xs={9}>
                  <TextField
                  variant="outlined"
                    multiline
                    rowsMax={3}
                    onChange={handleChange}
                    value={msg.message}
                    className={classes.msgEditor}  />
              </Grid>
              <Grid item sm={2} md={1} xs={2} lg={1}>
                <Grid container justify="center">
                  <Grid item>
                     <Box pt={0}>
                     <IconButton
                       size="large"
                       onClick={handleClick}
                       className={classes.button}
                       type="submit">
                       <Send />
                     </IconButton>
                     </Box>
                  </Grid>
                </Grid>
              </Grid>
          </Grid>
          </form>
         </>
}
export default withRouter(Chat);
