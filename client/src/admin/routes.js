// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import PostAddIcon from '@material-ui/icons/PostAdd';
import {
  Settings,
  PermMedia
} from "@material-ui/icons"

import DashboardPage from "./views/Dashboard/Dashboard";
import UserProfile from "./views/UserProfile/UserProfile";
import Media from "./views/Media/Media"
import Setting from "./views/Setting/Setting"
import Post from "./views/Post/Post"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/media",
    name: "Media",
    icon: PermMedia,
    component: Media,
    layout: "/admin"
  },
  {
    path: "/post",
    name: "Post",
    icon: PostAddIcon,
    component: Post,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: Settings,
    component: Setting,
    layout: "/admin"
  },

  

];

export default dashboardRoutes;
