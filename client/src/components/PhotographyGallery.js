import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";
import { Nav, NavItem, NavLink, Button } from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const url = "/api/uploadManage/image/";

const descriptionStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "25px 400px 15px 400px",
  fontSize: "4rem",
};

const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const navButtonStyle = { marginBottom: "1px", marginRight: "10px" };

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function CenteredTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          label="Architecture"
          onClick={() => props.switchToSubCatGallery("Architecture")}
        />
        <Tab
          label="Landscape"
          onClick={() => props.switchToSubCatGallery("Landscape")}
        />
        <Tab
          label="Street"
          onClick={() => props.switchToSubCatGallery("Street")}
        />
        <Tab
          label="Events"
          onClick={() => props.switchToSubCatGallery("Events")}
        />
        <Tab
          label="Portrait"
          onClick={() => props.switchToSubCatGallery("Portrait")}
        />
        <Tab label="ALL" onClick={() => props.switchToCatGallery()} />
      </Tabs>
    </Paper>
  );
}

class PhotoNavBar extends Component {
  render() {
    return (
      <div>
        <br />
        <h1 className="josefinFont" style={descriptionStyle}>
          Photography
        </h1>

        <p className="yanoneFont" style={{ margin: "30px 400px 10px 400px" }}>
          Hi, it’s nice to meet you! My name is Amy Touchette. I’m a fine-art
          photographer based in Brooklyn, and I’ve been photographing for almost
          20 years. I specialize in making portraits of strangers on the street
          both digitally and with film.
        </p>

        <br />

        <CenteredTabs
          switchToSubCatGallery={this.props.switchToSubCatGallery}
          switchToCatGallery={this.props.switchToCatGallery}
        />

        {/* <Nav tabs style={navStyle}>
          <NavItem>
            <Button
              color="light"
              style={navButtonStyle}
              onClick={() => this.props.switchToSubCatGallery("Architecture")}
            >
              Architecture
            </Button>
          </NavItem>

          <NavItem>
            <Button
              color="light"
              style={navButtonStyle}
              onClick={() => this.props.switchToSubCatGallery("Landscape")}
            >
              Landscape
            </Button>
          </NavItem>

          <NavItem>
            <Button
              color="light"
              style={navButtonStyle}
              onClick={() => this.props.switchToSubCatGallery("Street")}
            >
              Street
            </Button>
          </NavItem>

          <NavItem>
            <Button
              color="light"
              style={navButtonStyle}
              onClick={() => this.props.switchToSubCatGallery("Events")}
            >
              Events
            </Button>
          </NavItem>

          <NavItem>
            <Button
              color="light"
              style={navButtonStyle}
              onClick={() => this.props.switchToSubCatGallery("Portrait")}
            >
              Portrait
            </Button>
          </NavItem>

          <NavItem>
            <Button
              color="light"
              style={navButtonStyle}
              onClick={() => this.props.switchToCatGallery()}
            >
              ALL
            </Button>
          </NavItem>
        </Nav> */}
      </div>
    );
  }
}

class PhotographyGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.switchToSubCatGallery = this.switchToSubCatGallery.bind(this);
    this.switchToCatGallery = this.switchToCatGallery.bind(this);
  }

  componentDidMount() {
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: "Photography",
      }),
    };
    fetch("/api/gallery/category", req)
      .then((res) => res.json())
      .then((data) => this.returnUniqueImage(data));
  }

  returnUniqueImage(arr) {
    let imagesArr = arr.artworks.map((item) => item.imagenames);
    let emptyArr = [];
    imagesArr.map((item) => (emptyArr = emptyArr.concat(item)));
    let unique = [...new Set(emptyArr)];

    this.setState({ data: unique });
  }

  switchToCatGallery() {
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: "Photography",
      }),
    };
    fetch("/api/gallery/category", req)
      .then((res) => res.json())
      .then((data) => this.returnUniqueImage(data));
  }

  switchToSubCatGallery(subcat) {
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: "Photography",
        subcategory: subcat,
      }),
    };
    fetch("/api/gallery/subcategory", req)
      .then((res) => res.json())
      .then((data) => this.returnUniqueImage(data));
  }

  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PhotoNavBar
            switchToSubCatGallery={this.switchToSubCatGallery}
            switchToCatGallery={this.switchToCatGallery}
          />
        </div>
        {this.state.data !== null && <Photography data={this.state.data} />}
      </div>
    );
  }
}

class Photography extends React.Component {
  render() {
    return (
      <div>
        <Tiles data={this.props.data} />
      </div>
    );
  }
}

class Tiles extends React.Component {
  render() {
    // Create tile for each item in data array
    // Pass data to each tile and assign a key
    return (
      <div className="tiles">
        {this.props.data.map((data) => {
          return <Tile data={data} />;
        })}
      </div>
    );
  }
}

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      mouseOver: false,
    };
    // Bind properties to class instance
    this._clickHandler = this._clickHandler.bind(this);
    this._mouseEnter = this._mouseEnter.bind(this);
    this._mouseLeave = this._mouseLeave.bind(this);
  }
  // Event handlers to modify state values
  _mouseEnter(e) {
    e.preventDefault();
    if (this.state.mouseOver === false) {
      console.log(this.props.data);
      this.setState({
        mouseOver: true,
      });
    }
  }
  _mouseLeave(e) {
    e.preventDefault();
    if (this.state.mouseOver === true) {
      this.setState({
        mouseOver: false,
      });
    }
  }
  _clickHandler(e) {
    e.preventDefault();
    if (this.state.open === false) {
      this.setState({
        open: true,
      });
    } else {
      this.setState({
        open: false,
      });
    }
  }

  render() {
    // Modify styles based on state values
    let tileStyle = {};
    let headerStyle = {};
    let zoom = {};
    // When tile clicked
    if (this.state.open) {
      tileStyle = {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: "0",
        left: "0",
        objectFit: "contain",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        transform: "none",
        zIndex: 50,
        boxSizing: "border-box",
        margin: 0,
        padding: "10vh 10vw",
        cursor: "pointer",
      };
    } else {
      tileStyle = {
        maxWidth: "18vw",
        maxHeight: "18vw",
      };
    }

    return (
      <div className="tile">
        <img
          onMouseEnter={this._mouseEnter}
          onMouseLeave={this._mouseLeave}
          onClick={this._clickHandler}
          src={url + this.props.data}
          alt={this.props.data}
          style={tileStyle}
        />
      </div>
    );
  }
}

export default PhotographyGallery;
