import {
  defaultFont,
  grayColor,
} from "./mainStyle.js";

const dropdownStyle = theme => ({
  
  dropdownItem: {
    ...defaultFont,
    fontSize: "15px",
    padding: "5px 10px",
    margin: "0 5px",
    borderRadius: "2px",
    WebkitTransition: "all 150ms linear",
    MozTransition: "all 150ms linear",
    OTransition: "all 150ms linear",
    MsTransition: "all 150ms linear",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "1.42857143",
    color: grayColor[8],
    whiteSpace: "nowrap",
    height: "unset",
    minHeight: "unset",
  }
});

export default dropdownStyle;
