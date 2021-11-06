import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
import { MessageSquare } from "react-feather";
import { unreadMessages } from '../../actions/privateChat'
import { getCookie } from '../../actions/auth'


const Popover = styled(MuiPopover)`
  .MuiPaper-root {
    width: 300px;
    border: 1px solid black;
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

const MessageHeader = styled(Box)`
  text-align: center;
  border-bottom: 1px solid black;
`;

function Message({ title, description, image }) {
  return (
    <ListItem divider component={Link} to="#">
      <ListItemAvatar>
        <Avatar src={image} alt="Avatar" />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          variant: "subtitle2",
          color: "textPrimary",
        }}
        secondary={description}
      />
    </ListItem>
  );
}

function MessagesDropdown() {
  const ref = useRef(null);
  const token = getCookie("token")
  const [isOpen, setOpen] = React.useState(false);
  const [unreadMsgList, setUnReadMsgList] = React.useState();
  const [msgCount, setMsgCount] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
     (async () => {
      let result = await unreadMessages(token);
      setUnReadMsgList(result.messages)
      setMsgCount(result.unread_count)
     })()
  }, [])

  return (
    <React.Fragment>
      <Tooltip title="Messages">
        <IconButton color="inherit" ref={ref} onClick={handleOpen}>
          <Indicator badgeContent={msgCount}>
            <MessageSquare style={{ color:"grey"}}/>
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
        <MessageHeader p={2}>
          <Typography variant="subtitle1" color="textPrimary">
            3 New Messages
          </Typography>
        </MessageHeader>
        <React.Fragment>
          <List disablePadding>
            <Message
              title="Lucy Lavender"
              description="Nam pretium turpis et arcu. Duis arcu tortor."
              image="/static/img/avatars/avatar-1.jpg"
            />
            <Message
              title="Remy Sharp"
              description="Curabitur ligula sapien euismod vitae."
              image="/static/img/avatars/avatar-2.jpg"
            />
            <Message
              title="Cassandra Mixon"
              description="Pellentesque auctor neque nec urna."
              image="/static/img/avatars/avatar-3.jpg"
            />
          </List>
          <Box p={1} display="flex" justifyContent="center">
            <Button size="small" component={Link} to="#">
              Show all messages
            </Button>
          </Box>
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
}

export default MessagesDropdown;
