// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import PostAddIcon from "@material-ui/icons/PostAdd";
import BurstModeOutlinedIcon from "@material-ui/icons/BurstModeOutlined";
import StoreMallDirectoryOutlinedIcon from "@material-ui/icons/StoreMallDirectoryOutlined";
import ContactsIcon from "@material-ui/icons/Contacts";
import { Settings, PermMedia } from "@material-ui/icons";

import DashboardPage from "./views/Dashboard/Dashboard";
import Media from "./views/Media/Media";
import Setting from "./views/Setting/Setting";
import Post from "./views/Post/Post";
import Gallery from "./views/Gallery/Gallery";
import Store from "./views/Store/Store";
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
    path: "/contactMe",
    name: "ContactMe",
    icon: ContactsIcon,
    component: ContactMe,
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
