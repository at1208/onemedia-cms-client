import React from 'react';
import { withRouter } from 'react-router-dom';
import DashboardLayout from '../../components/layout/dashboardLayout';
import UserList from '../../components/chat/userList';
import RecentMessages from '../../components/chat/recentMessages'
import { Grid } from '@material-ui/core';

const Chats = ({ match: { url } }) => {
      const [onlineUsersList, setOnlineUsersList] = React.useState();

  return <>
         <DashboardLayout>
           <Grid container justify="flex-start">
             <Grid item xs={12} sm={3} md={3} lg={3}>
               <UserList
                 url={url}
                 getOnlineUsers={(users) => setOnlineUsersList(users)}
                 />
             </Grid>
             <Grid item xs={12} sm={9} md={9} lg={9}>
               <RecentMessages
                />
             </Grid>
           </Grid>
         </DashboardLayout>
         </>
}

export default withRouter(Chats);
