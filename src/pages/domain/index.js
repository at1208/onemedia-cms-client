import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Typography, Box } from '@material-ui/core';
import CreateDomain from '../../components/domain/createDomain';
import DomainFilter from '../../components/domains/domainFilter';
import DomainList from '../../components/domains/domainList';

const Domains = () => {
  const [domains, setDomains] = useState([]);
  const [domainList, setDomainList] = useState([]);

  useEffect(() => {
    setDomainList(domains);
  }, [domains])


  return <>
            <DashboardLayout page="domain" permission="read">
            <Grid container justify="space-between">
               <Grid item  md={9} sm={9} xs={12}>
                 <Box pl={3}>
                   <Typography variant="h5">
                      Domains
                   </Typography>
                 </Box>
               </Grid>
               <Grid item  md={3} sm={3} xs={12}>
                 <CreateDomain />
               </Grid>
            </Grid>
            <br />
            <DomainFilter domains={(domain) => setDomains(domain)}/>
            <DomainList domainList={domainList} />
            </DashboardLayout>
         </>
}

export default Domains;
