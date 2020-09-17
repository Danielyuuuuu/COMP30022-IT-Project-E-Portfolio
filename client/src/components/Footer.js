import React from "react";
import "../App.css";

const Footer = () => (
  <div
    className="footer"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <p>This is our footer&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </p>
    <p>
      <a href="http://localhost:8000/user/register">Admin Login</a>
    </p>
  </div>
);

export default Footer;
