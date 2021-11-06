import React from 'react';
import Private from '../components/protectedRoutes/privateRoute';
import Auth from '../components/protectedRoutes/authRoute';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import AllEmployees from '../pages/employees/employee';
import EmployeeDetail from '../pages/employees/employeeDetail';
import Department from '../pages/employees/department';
import Designation from '../pages/employees/designation';
import Contact from '../pages/contact';
import Reset from '../pages/reset';
import SetPassword from '../pages/reset/setPassword'
import Onboard from '../pages/onboard';
import Activities from '../pages/activities';
import Projects from '../pages/projects';
import Tasks from '../pages/tasks';
import SelectChannel from '../pages/chats/selectChannel';
import ChatUserList from '../pages/chats';
import PrivateChat from '../pages/chats/privateChat';
import ChannelChats from '../pages/chats/channelChat';
import CreateContent from '../pages/content/create';
import Profile from '../pages/profile';
import AllBlogs from '../pages/content/allBlogs';
import BlogDetail from '../pages/content/blogDetail';
import MyBlogDetail from '../pages/content/myBlogDetail';
import Category from '../pages/category';
import Domain from '../pages/domain';
import MyBlogs from '../pages/content/myBlogs';
import EditBlog from '../pages/content/editBlog';
import EditMyBlog from '../pages/content/myBlogEdit';
import MyTasks from '../pages/tasks/myTasks';
import Notifications from '../pages/notification';

const Router = () => {
   return <>
           <Auth path="/" exact component={Login} />
           <Private path="/dashboard" exact component={Dashboard} />
           <Private path="/all-employees" exact component={AllEmployees} />
           <Private path="/employee-detail/:id" exact component={EmployeeDetail} />
           <Private path="/content/create" exact component={CreateContent} />
           <Private path="/content/blog/detail/:id" exact component={BlogDetail} />
           <Private path="/content/myblog/detail/:id" exact component={MyBlogDetail} />
           <Private path="/content/blog/edit/:id" exact component={EditBlog} />
           <Private path="/content/myblog/edit/:id" exact component={EditMyBlog} />
           <Private path="/content/blogs" exact component={AllBlogs} />
           <Private path="/department" exact component={Department} />
           <Private path="/designation" exact component={Designation} />
           <Private path="/contact" exact component={Contact} />
           <Private path="/activities" exact component={Activities} />
           <Private path="/projects" exact component={Projects} />
           <Private path="/tasks" exact component={Tasks} />
           <Private path="/categories" exact component={Category} />
           <Private path="/domains" exact component={Domain} />
           <Private path="/chats" exact component={ChatUserList} />
           <Private path="/channels" exact component={SelectChannel} />
           <Private path="/chats/private/:id" exact component={PrivateChat} />
           <Private path="/profile" exact component={Profile} />
           <Private path="/my-blogs" exact component={MyBlogs} />
           <Private path="/my-tasks" exact component={MyTasks} />
           <Private path="/notifications" exact component={Notifications} />
           <Private path="/chats/:channel" exact component={ChannelChats} />
           <Auth path="/reset" exact component={Reset} />
           <Auth path="/auth/password/reset/:resetLink" exact component={SetPassword} />
           <Auth path="/auth/onboard/:token" exact component={Onboard} />
          </>
}
export default Router;
