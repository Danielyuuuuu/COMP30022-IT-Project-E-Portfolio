import {
  container,
  defaultFont,
  grayColor
} from "../../assets/jss/mainStyle.js";

const headerStyle = () => ({
  appBar: {
    backgroundColor: "white",
    borderBottom: "0",
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    paddingTop: "10px",
    color: grayColor[7],
    border: "0",
    borderRadius: "3px",
    padding: "5px 0",
    minHeight: "40px",
    display: "block"
  },
  container: {
    ...container,
    minHeight: "50px"
  },

  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    letterSpacing: "unset",
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    margin: "0",
    "&:hover,&:focus": {
      background: "transparent"
    }
  },
});

export default headerStyle;
