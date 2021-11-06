import React, { useEffect, useState } from 'react';
import { recentMessages } from '../../actions/privateChat';
import { isAuth, getCookie } from '../../actions/auth';
import { Grid, IconButton, Card, Box, Typography, TextField } from '@material-ui/core';

const RecentMessages = () => {
  const token = getCookie("token");
  const [recentMessagesList, setRecentMessagesList] = useState([]);

  React.useEffect(() => {
    ( async () => {
      let response =  await recentMessages(token);
       setRecentMessagesList(response)
    })()
  }, [])

  return <>
         </>
}

export default RecentMessages;
