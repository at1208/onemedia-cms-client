import React, { useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import DashboardLayout from '../../components/layout/dashboardLayout';
import socket from '../../utils/socketio';
import { Grid, IconButton, Card, Typography,  Avatar, Badge  } from '@material-ui/core';
import { Send } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { getCookie, isAuth } from '../../actions/auth';
import moment from 'moment';
import { getChannels, getChannelsDetails } from '../../actions/channel';
import { useHistory } from 'react-router-dom';
import { getChannelChats, readChannelChats } from '../../actions/channelchat';
import CreateChannelForm from '../../components/channel/channelForm';
import ChannelMembers from '../../components/channel/channelMembers';
import { useMediaQuery } from '@material-ui/core';
import ReactQuill from 'react-quill';
import renderHTML from 'react-render-html';
import MessageActions from '../../components/channel/action';
import { uploadFile } from '../../actions/upload'
import Offline from "./offline";
const first_name = isAuth() && isAuth().first_name;
const last_name = isAuth() && isAuth().last_name;
const email = isAuth() && isAuth().email;
const id = isAuth() && isAuth()._id;
const headshot_url = isAuth() && isAuth().headshot_url




const useStyles = makeStyles((theme) => ({
    messageRoot:{
      [theme.breakpoints.down('xs')]: {
       position:"fixed",
       bottom:"0px",
       left:"0px",
       right:"0px",
       paddingLeft:"5px",
       paddingRight:"5px",
       paddingBottom:"5px"
      },
      paddingLeft:"3px",
      paddingRight:"3px"
    },
   cardRoot:{
     width:"100%",
     padding:"30px 10px 30px 10px",
     // minHeight:"80vh",
     // backgroundColor:'#01264c!important'
   },
   icon:{
     color:"#76ff03"
   },
   chatDisplay:{
   padding:"0px 0px 0px 0px",
   backgroundColor:"rgb(247, 249, 252)",
   overflowY: 'scroll',
   // minHeight:"60vh",
   [theme.breakpoints.down('xs')]: {
       padding:"0px",
       marginTop:"3px",
       minHeight:"62vh",
       maxHeight:"62vh"
   },
   minHeight:"70vh",
   maxHeight:"70vh"
 },
time:{
  fontSize:"10px",
  color:"grey"
},
button:{
  padding:"12px",
  margin:"7px",
  [theme.breakpoints.down('xs')]: {
      padding:"0px",
      marginTop:"3px"
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
   width:"100%",
   marginLeft:"10px",
   fontFamily:"sans-serif",
 },
 singleMessage:{
   padding:"10px",
   margin:"10px",
   backgroundColor: "white"
 },
 sendmsg:{
   zIndex:1,
   backgroundColor:"white",
   padding:"10px"
 },
 singleMessageNotReadYet:{
   backgroundColor:"#fffaea",
   padding:"10px",
   margin:"10px",
 },
 channelNameMb:{
   color:"grey"
 }
}));

const capitalizeFirstCharacter = (name) => {
  let words = name.split(' ');
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
};

const Chats = ({ match: { params: { channel } }, match: { url }, location }) => {
  const token = getCookie("token");
  const history = useHistory();
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:961px)');
  var messageContainer = React.useRef();
  const [online, setOnline] = React.useState();
  const [typing, setTyping ] = React.useState({ status: false, msg: "" });
  const [msg, setMsg] = React.useState ({  message: "",
                                           senderName: "",
                                           senderEmail: "",
                                           senderId: "",
                                           timestamp:"",
                                           channelId:"",
                                           readBy: [],
                                           senderPicture: ""
                                         });

  const [chats, setChats] = React.useState([]);
  const [channels, setChannels] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const [connected, setConnected] = React.useState(true);
  const [channelMembers, setChannelMembers] = React.useState();
  const [displayMessage, setDisplayMessage] = React.useState({
                                            message: "",
                                            senderName: "",
                                            senderEmail: "",
                                            senderId: "",
                                            timestamp:"",
                                            channelId:"",
                                            readBy: [],
                                            senderPicture: ""
                                          });

  function getChannelId(term) {
       return term.search.split("").slice(4).join("");
  }

  React.useEffect(() => {
    socket.emit("join", { room: getChannelId(location) });

    socket.on("connection", (response) => {
        setOnline(response.online);
    })
    socket.on("disconnected", (response) => {
        setOnline(response.online);
    })

    socket.emit("urlchanged", { url });
    socket.on("urlchanged", (response) => {
        setOnline(response.online);
    })

    socket.on("receiveMessage", (msg) => {
       setChats((prev) => [...prev, msg.msg.msg ]);
    })

    socket.on("typingResponse", (msg) => {
        setTyping({ status: true, msg: msg.msg });
        setTimeout(() => {
          setTyping({ status: false, msg: "" });
        }, 2000)
    });

    socket.on("newJoined", (val) => {
      console.log(val)
    })

  }, [])

  React.useEffect(() => {
   getChannels(id, token)
     .then((value) => {
       setChannels(value)
     })
     .catch((err) => {
       console.log(err)
     })
  }, [reload, location])

  React.useEffect(() => {
    messageContainer.scrollIntoView();
  }, [chats])

  React.useEffect(() => {
     getChannelChats(getChannelId(location),{},token)
       .then((value) => {
         setChats(value)
       })
       .catch((err) => {
         console.log(err)
       })
  }, [url])

  React.useEffect(() => {
    getChannelsDetails(getChannelId(location), token)
      .then( response => {
         setChannelMembers(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


setInterval(() => {
  setConnected(socket.connected)
}, 10000)

React.useEffect(() => {
  const timeOutId = setTimeout(() => setMsg(displayMessage), 500);
  return () => clearTimeout(timeOutId);
}, [displayMessage]);


  const currentTab = path => {
     if(path === history.location.pathname){
       return true;
     }
     return false;
  }

  const defaultProps = {
    color: 'secondary'
  };



const handleSubmit = (e) => {
    e.preventDefault();
    if(msg.message.length === 0) return;
    socket.emit("sendMessage", { msg }, {room: getChannelId(location) });
    setChats([...chats, msg]);
    setDisplayMessage({...msg,
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
    setDisplayMessage({...msg,
      message: e,
      senderPicture: headshot_url,
      senderName: first_name + " " + last_name,
      senderId: id,
      senderEmail: email,
      channelId: getChannelId(location),
      timestamp: new Date(),
      readBy: [] });
    socket.emit("typing", { first_name,last_name, email, senderId:id}, {room:getChannelId(location)})
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


async function readChat(chatId, userId){
      chatId && await readChannelChats(chatId, userId, token)
}

const chatsList = chats.map((item, i) => {
      if(!(item && item.readBy && item.readBy.includes(id))){
         readChat(item._id, id)
      }
  return  <div key={i} className={classes.singleMessage}>
             <Grid container justify="flex-start" spacing={2}>
               <Grid item xs={3} md={1} sm={2}>
                  <Grid container justify="flex-start">
                    <Avatar alt={item.senderName} src={item.senderPicture} width={40} height={40} />
                  </Grid>
               </Grid>
               <Grid item xs={8} md={10} sm={9}>
                  <Grid container justify="flex-start">
                    <Grid item xs={12} md={12} sm={12}>
                      <Typography variant="body1" className={classes.senderName}>{capitalizeFirstCharacter(item.senderName || "undefined")}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                     <Typography className={classes.time} variant="caption">{moment(item.timestamp).format('MMMM Do YYYY, h:mm a')}</Typography>
                    </Grid>
                  </Grid>
               </Grid>
               <Grid item xs={1} md={1} sm={1}>
                  <Grid container justify="flex-end">
                    <MessageActions />
                  </Grid>
               </Grid>
               <div className={classes.message}>
                  {renderHTML(item.message)}
               </div>
             </Grid>
          </div>
})




 async function apiPostNewsImage(img) {
          let result = await uploadFile(img, token);
          if(result){
            return result.url
          }
    }

    function imageHandler() {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('upload', file);

            // Save current cursor state
            const range = this.quill.getSelection(true);

            // Insert temporary loading placeholder image
            this.quill.insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);

            // Move cursor to right side of image (easier to continue typing)
            this.quill.setSelection(range.index + 1);

            const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

            // Remove placeholder image
            this.quill.deleteText(range.index, 1);

            // Insert uploaded image
            // this.quill.insertEmbed(range.index, 'image', res.body.image);
            this.quill.insertEmbed(range.index, 'image', res);
        };
    }


    const modules = useMemo(() => ({
      toolbar: {
          container: [
              [{ header: [1, 2] }],
              ['bold',
               'italic',
               'underline',
               // 'strike',
               // 'blockquote'
             ],
              // [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image']
          ],
          handlers: {
              image: imageHandler
          }
      }
     }), [])



  return <>
           <DashboardLayout page="chat" permission="read">
           <Offline status={connected} />
           <Grid container justify="center" spacing={0}>
             <Grid item sm={12} md={8} lg={9} xs={12}>
                <Card className={classes.chatDisplay}>
                {chatsList}
                <div ref={(el) => messageContainer = el}>
                </div>
                </Card>
                <Typography variant="body2" align="center">{typing.status && typing.msg}</Typography>
                <br /> <br />
                <form onSubmit={handleSubmit} className={classes.messageRoot}>
                    {!matches && <Typography variant="body2" align="center" className={classes.channelNameMb}>#{channel}</Typography>}
                     <Grid container justify="center">
                           <Grid item sm={11} md={11} xs={12}>
                           <ReactQuill
                             value={displayMessage.message}
                             theme="snow"
                             modules={modules}
                             onChange={handleChange} />
                           </Grid>
                           <Grid item sm={1} md={1} xs={12}>
                             <Grid container justify="center">
                               <Grid item>
                                 <IconButton
                                   size="small"
                                   className={classes.button}
                                   type="submit">
                                   {!matches && <font>Send</font>} <Send />
                                 </IconButton>
                               </Grid>
                             </Grid>
                           </Grid>
                   </Grid>
                </form>
             </Grid>
             {matches && <Grid item xs={12} md={3} sm={12} lg={3}>
             <Typography variant="h6" align="center" className={classes.channelName}><b>#{channel}</b></Typography>
                            <Card className={classes.cardRoot}>
                               <CreateChannelForm pageReload={(status) => setReload(status)}/>
                               <br />
                               <ChannelMembers pageReload={(status) => setReload(status)} members={channelMembers}/>
                               <br />
                                 <Typography variant="h6" align="center">Subscribed Channels</Typography>
                               {channelsList}
                            </Card>
                         </Grid>}
           </Grid>
           </DashboardLayout>
         </>
}
export default withRouter(Chats);
