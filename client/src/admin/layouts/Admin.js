import React, { useContext } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
// creates a beautiful scrollbar
// import PerfectScrollbar from "perfect-scrollbar";

// import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../components/Navbars/Navbar.js";
import Footer from "../components/Footer/Footer.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "../routes.js";

import styles from "./adminStyle.js";

import logo from "../assets/img/reactlogo.png";

import UserContext from "../../context/UserContext";

// let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  const { userData } = useContext(UserContext);

  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();

  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };

  return (
    <div className={classes.wrapper}>
      {userData.user ? (
        <div>
          <Sidebar
            routes={routes}
            logoText={"RunTime Terror"}
            logo={logo}
            color={"blue"}
            {...rest}
          />
          <div className={classes.mainPanel} ref={mainPanel}>
            <Navbar
              routes={routes}
              // handleDrawerToggle={handleDrawerToggle}
              {...rest}
            />
            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
            {getRoute() ? (
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
              </div>
            ) : (
              <div className={classes.map}>{switchRoutes}</div>
            )}
            <Footer />
          </div>
        </div>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
}
