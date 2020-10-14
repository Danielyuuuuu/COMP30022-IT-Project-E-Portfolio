// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import PostAddIcon from "@material-ui/icons/PostAdd";
import BurstModeOutlinedIcon from "@material-ui/icons/BurstModeOutlined";
import StoreMallDirectoryOutlinedIcon from "@material-ui/icons/StoreMallDirectoryOutlined";
import ContactsIcon from "@material-ui/icons/Contacts";

import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";

import { Settings, PermMedia } from "@material-ui/icons";

import DashboardPage from "./views/Dashboard/Dashboard";
import UserProfile from "./views/UserProfile/UserProfile";
import Media from "./views/Media/Media";
import Setting from "./views/Setting/Setting";
import Post from "./views/Post/Post";
import Gallery from "./views/Gallery/Gallery";
import Store from "./views/Store/Store";

import Comments from "./views/Comments/Comments";
import ContactMe from "./views/ContactMe/ContactMe";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/gallery",
    name: "Gallery",
    icon: BurstModeOutlinedIcon,
    component: Gallery,
    layout: "/admin",
  },
  {
    path: "/media",
    name: "Media",
    icon: PermMedia,
    component: Media,
    layout: "/admin",
  },
  {
    path: "/post",
    name: "Post",
    icon: PostAddIcon,
    component: Post,
    layout: "/admin",
  },

  {
    path: "/store",
    name: "Store",
    icon: StoreMallDirectoryOutlinedIcon,
    component: Store,
    layout: "/admin",
  },
  {
    path: "/comments",
    name: "Comments",
    icon: CommentOutlinedIcon,
    component: Comments,
    layout: "/admin",
  },
  {
    path: "/contactMe",
    name: "ContactMe",
    icon: ContactsIcon,
    component: ContactMe,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: Settings,
    component: Setting,
    layout: "/admin",
  },
];

export default dashboardRoutes;
