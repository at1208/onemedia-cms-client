import React, { useState, useEffect } from 'react';
import { withRouter, useHistory, Link } from 'react-router-dom';
import { Grid, Typography, Box, Chip, Card, Button } from '@material-ui/core';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { makeStyles } from '@material-ui/core/styles';
import { singleBlog } from '../../actions/blog';
import { getCookie } from '../../actions/auth';
import renderHTML from 'react-render-html';
import moment from 'moment'
import ApprovalStatus from '../../components/content/approvalstatus';
import LiveStatus from '../../components/content/livestatus';
import { reviewUpdate } from '../../actions/blog'
import { checkModulePermission } from '../../actions/employee'
const readingTime = require('reading-time');

const useStyles = makeStyles((theme) => ({
  body:{
    letterSpacing: "-0.003em",
    lineHeight: "32px",
    marginTop: "2em",
    fontSize: "21px",
    marginBottom: "-0.46em",
    fontFamily: `charter, Georgia, Cambria, "Times New Roman", Times, serif`,
    fontStyle: "normal",
    wordBreak: "break-word",
    color: "rgba(41, 41, 41, 1)",
    fontWeight: "400",
  },
   blogContent:{
     [theme.breakpoints.up('sm')]: {
        // padding:"10px 20px 20px 20px",
    },
    [theme.breakpoints.up('md')]: {
       // padding:"10px 100px 100px 100px",
   },
  },
  approved:{
   background: "rgb(76, 175, 80)",
   color:"rgb(255, 255, 255)",
   // marginLeft:"10px",
   "&:hover":{
     background: "rgb(76, 175, 80)",
     color:"rgb(255, 255, 255)",
   },
  },
  button:{
    background: '#6387ED 0% 0% no-repeat padding-box',
    borderRadius: '8px',
    opacity: 1,
    width: '100%',
    fontWeight: '500',
    height: '49px',
    textTransform: 'none',
    color: 'white',
    '&:hover': {
      fontWeight: '500',
      background: '#6387ED 0% 0% no-repeat padding-box',
      color: 'white',
    },
  },
  notApproved:{
   background: "rgb(244, 67, 54)",
   color:"rgb(255, 255, 255)",
   "&:hover":{
     background: "rgb(244, 67, 54)",
     color:"rgb(255, 255, 255)",
   },
   // marginLeft:"10px"
  },
  waiting:{
   background: "rgb(245, 124, 0)",
   color:"rgb(255, 255, 255)",
   // marginLeft:"10px",
   "&:hover":{
     background: "rgb(245, 124, 0)",
     color:"rgb(255, 255, 255)",
   },
  },
  blogTitle:{
     padding: "0px 0px 20px 0px",
      fontSize: "48px",
      lineHeight: "60px",
      marginTop: "0.56em",
      marginBottom: "-0.27em",
      letterSpacing: "-0.011em",
      fontWeight: "400",
      color: "rgba(41, 41, 41, 1)",
      fontStyle: "normal",
      fontFamily: `fell, Georgia, Cambria, "Times New Roman", Times, serif`,
      [theme.breakpoints.down('xs')]: {
         fontSize:"35px",
         lineHeight: "48px",
         padding: "0px 0px 50px 0px"
     },
    [theme.breakpoints.up('sm')]: {
       fontSize:"40px",
       padding: "0px 0px 50px 0px"
   },
 },
 headshot:{
  height:'70px',
   width:'70px',
   borderRadius:"50%",
   objectFit: "cover"
 }
}));

const BlogDetail = ({ match: { params: { id } } }) => {
   const [blog, setBlog] = useState();
   const token = getCookie("token");
   const history = useHistory();
   const classes = useStyles();
   const [reload, setReload] = useState(false);
   const [approvalCheck, setApprovalCheck] = useState(false);
   const [reviewSetting, setReviewSetting] = useState({
     approval: "",
     status: "",
   })

    useEffect(() => {
      (async () => {
       let permissionCheck = await checkModulePermission('blog','update',token);
          setApprovalCheck(permissionCheck)
      })()
    })

     useEffect(() => {
        singleBlog(id, token)
          .then(response => {
            setBlog(response)
            setReviewSetting({ ...reviewSetting,
              approval: response.approval,
              status: response.status })
          })
          .catch(error => {
            console.log(error)
          })
     }, [reload])

const handleSave = () => {
   reviewUpdate(id, reviewSetting, token)
    .then((value) => {
       setReload(!reload)
    })
    .catch((err) => {
      console.log(err)
    })
}


const showCategories = () => {
 const categories =  blog && blog.categories.map((item, i) => {
    return <Grid container justify="center">
             <Grid item sm={3} md={3}>
               <Chip size="small" label={item.name}   />
             </Grid>
          </Grid>
  })
  return <>
          {categories}
         </>
}

 const showBlogContent = () => {
   return <>
   <Box justifyContent="center">
     <img src={blog.featureImg} width="100%"/>
   </Box>
   <Box justifyContent="center">
     <Typography variant="body1" className={classes.body}>
      {renderHTML(blog.body)}
     </Typography>
   </Box>

         </>
 }

 const BlogApproval = () => {
   return <>
         <Grid container justify="space-between">
           <Grid item sm={5}>
           <Box p={2}>
           <ApprovalStatus status={blog.approval} setValue={(value) => setReviewSetting({...reviewSetting, approval: value })}/>
           <br />
           <LiveStatus status={blog.status} setValue={(value) => setReviewSetting({...reviewSetting, status: value })}/>
           <br />
            <Grid container justify="center">
            <Grid item>
            <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSave}
            className={classes.button}
            >
            Save Changes
            </Button>
            </Grid>
            </Grid>
           </Box>
         </Grid>

          <Grid item sm={5}>
            <Grid container justify="space-between">
              <Grid item sm={3}>
                Approval status
              </Grid>
              <Grid item sm={9}>
                <Chip size="small" label={blog.approval.toLowerCase()} className={blog.approval === "WAITING"?classes.waiting:blog.approval ==="APPROVED"?classes.approved:blog.approval ==="NOT APPROVED"?classes.notApproved:""}/>
              </Grid>
            </Grid>
            <br />
            <Grid container justify="space-between">
              <Grid item sm={3}>
              Live status
              </Grid>
              <Grid item sm={9}>
              <Chip size="small" label={blog.status?"active":"inactive"} className={blog.status?classes.approved:classes.notApproved}/>
              </Grid>
            </Grid>
            <br />
            <Grid container justify="space-between">
              <Grid item sm={3}>
              Updated By
              </Grid>
              <Grid item sm={9}>
             {blog.updatedBy.full_name}
              </Grid>
            </Grid>
            <br />
            <Grid container justify="space-between">
              <Grid item sm={3}>
              Domain
              </Grid>
              <Grid item sm={9}>
              {blog.domain.url}
              </Grid>
            </Grid>
            <br />
            <Grid container justify="space-between">
              <Grid item sm={3}>
              CreatedAt
              </Grid>
              <Grid item sm={9}>
              {moment(blog.createdAt).format("MMMM Do YYYY, h:mm a")}
              </Grid>
            </Grid>
          </Grid>
         </Grid>
          </>
 }

 if(blog){
   return <>
           <DashboardLayout page="blog" permission="read">
           <Card>
             <Grid container justify="center">
               <Grid item sm={8} md={8}>
                 <Typography variant="h4" align="center" className={classes.blogTitle}>
                  {blog.title}
                 </Typography>
                  <Grid container>
                   <Grid item>
                      <img
                      className={classes.headshot}
                      src={blog.postedBy.headshot_url}
                      alt={blog.postedBy.first_name} />
                   </Grid>
                   <Grid item sm={8} md={8}>
                     <Box pt={2} pl={2}>
                     <Typography variant="body1">
                        {blog.postedBy.full_name}
                     </Typography>
                     <Typography variant="body1">
                        {moment(blog && blog.createdAt).format("MMM D")}  . {readingTime(blog && blog.body || " ").text}
                     </Typography>
                      </Box>
                   </Grid>
                 </Grid>

               </Grid>
             </Grid>
             <br /><br />
             <Grid container justify="center" spacing={3}>
               <Grid item sm={8} md={8} xs={12} className={classes.blogContent}>

                {showBlogContent()}

                <br /> <br />
                {showCategories()}
                <br /> <br />
                <hr />
                <br /> <br />
                <Link to={{ pathname: `/content/blog/edit/${blog._id}`, state: blog }}>
                <Button
                variant="contained"
                onClick={() => history.push(``)}
                className={classes.button}
                size="large"
                fullWidth
                >
                Edit Blog
                </Button>
                </Link>
                <br /><br /> <br /><br />
                {approvalCheck && BlogApproval()}
               </Grid>

             </Grid>
  </Card>
           </DashboardLayout>
          </>
 }else{
   return <DashboardLayout></DashboardLayout>
 }

}

export default withRouter(BlogDetail);
