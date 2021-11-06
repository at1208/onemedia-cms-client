import React, { useEffect, useState } from 'react';
import { allNotifications } from '../../actions/notification';
import { ToastContainer, toast } from 'react-toastify';
import { getCookie } from '../../actions/auth';
import moment from 'moment';
import {
 ListItem,
 Typography,
 Card,
 Grid,
 Box,
 TextField
} from "@material-ui/core";

const NotificationList = ({ viewAs }) => {
  // viewAs -> true means All notifications(Admin)
  const token = getCookie("token");
  const [notifyList, setNotifyList] = useState([]);

  useEffect(() => {
    allNotifications(token, viewAs)
    .then((value) => {
        setNotifyList(value)
    })
    .catch((err) => {
       toast.error(err.error)
    })
  }, [viewAs])


const list = () => {
  if(notifyList.length>0){
  return notifyList.map((msg, i) => {
      let desc = JSON.parse(msg.description);
      return <>
           <ListItem>
              <Card>
              <Box p={1} position="relative">
             <Grid container>
               <Grid item xs={12} sm={12} md={12} lg={12}>
               <Typography variant="h6"   style={{ fontWeight:600 }}>
                 {msg.title}
               </Typography>
               </Grid>
               <Grid item xs={12} sm={12} md={12} lg={12}>
               <TextField
                  fullWidth
                  disabled
                  multiline

                  size="small"
                  value={desc.description} />
               </Grid>
             </Grid>
              <Box position="absolute" bottom={0} right={10}>
              <Typography variant="body2">
               <b>{moment(msg.createdAt).format(" h:mm a, Do MMMM YYYY")}</b>
              </Typography>
              </Box>
             </Box>
          </Card>




              {/**/}
           </ListItem>

           </>
    })
  }else {
    return <>
           </>
  }

}


  return <>
          <ToastContainer />
           <Grid container justify="center">
              <Grid item xs={12} sm={10} md={10} lg={10}>
               {list()}
             </Grid>
           </Grid>
         </>
}

export default NotificationList;
