import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from '../../actions/auth';
import { getNotification, seenNotification } from '../../actions/notification';
import {
  Avatar as MuiAvatar,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover as MuiPopover,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Bell } from "react-feather";

const Popover = styled(MuiPopover)`
  .MuiPaper-root {
    width: 300px;
    border: 0px solid grey;
    box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important
  }
`;

const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: red;
    color: white;
  }
`;

const Avatar = styled(MuiAvatar)`
  background: dodgerblue;
`;

const NotificationHeader = styled(Box)`
  text-align: center;
  border-bottom: 1px solid black;
`;

const token = getCookie("token");

function Notification({ title, description, notifyId }) {
  const history = useHistory()
  let desc = JSON.parse(description);

  const handleClick = async (id) => {
    await seenNotification(id, token);
     history.push("/notifications")
   }

  return (
    <ListItem divider onClick={() => handleClick(notifyId)} style={{ cursor:"pointer"}}>
      <ListItemAvatar>
        <Avatar src={desc.createdBy.headshot_url}>

        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          variant: "subtitle2",
          color: "textPrimary",
        }}
        secondary={desc.description}
      />
    </ListItem>
  );
}

function NotificationsList({data}){
   if(data.length>0){
     return data.map((noti, i) => {
       return <Notification
               notifyId={noti._id}
               title={noti.title}
               description={noti.description}

       />
     })
   }else {
     return <>
            </>
   }
}

function NotificationsDropdown() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const [notifys, setNotifys] = useState([])
  const [counts, setCounts] = useState()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
     (async () => {
       let notify = await getNotification(token);
         setNotifys(notify.notifications);
         setCounts(notify.count)
     })()
  }, [])


  return (
    <React.Fragment>
      <Tooltip title="Notifications">
        <IconButton color="inherit" ref={ref} onClick={handleOpen}>
          <Indicator badgeContent={counts}>
            <Bell style={{ color:"grey" }}/>
          </Indicator>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <NotificationHeader p={2}>
          <Typography variant="subtitle1" color="textPrimary">
            {counts} New Notifications
          </Typography>
        </NotificationHeader>
        <React.Fragment>
          <List disablePadding>
             <NotificationsList data={notifys}/>
          </List>
          <Box p={1} display="flex" justifyContent="center">
            <Button size="small" component={Link} to={'/notifications'}>
              Show all notifications
            </Button>
          </Box>
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
}

export default NotificationsDropdown;
