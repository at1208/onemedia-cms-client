import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import  DashboardInfo from '../../components/dashboard/dashboardInfo';


const Dashboard = () => {
  return <>
          <DashboardLayout page="dashboard" permission="read">
             <DashboardInfo />
          </DashboardLayout>
         </>
}

export default Dashboard;
