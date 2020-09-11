import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <p className={classes.right}>
            &copy; 2020 {" "}
            <a
              href="https://itproject-wiki.rexding.com"
              className={classes.a}
            >
             Runtime Terror
            </a>
            , comp30022 itproject team from unimelb
        </p>
      </div>
    </footer>
  );
}
