import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";

import { useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const url = "http://localhost:8000/api/uploadManage/image/";

// const data = [
//   "cff15ed84dad8a582143ce1ada541820.png",
//   "8ab345134aebe787a4b15a70a92ccba8.jpg",
//   "4e170759f6ca7d91dee0140cd50297ff.jpg",
//   "30b77e8b3a1a982ddb80ff44c2b44f07.jpg",
//   "6653fe015a1e76145807967919eff9e1.jpg",
//   "12e2e7680ce28e875985ae91af5b0458.png",
//   "checkname.jpg",
//   "下载.jpg",
//   "7b3c802ea99be25d56eb36fe2619fd37.png",
// ];

const PaintNavBar = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <br />
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "25px 400px 15px 400px",
        }}
      >
        Painting
      </h1>

      <p style={{ margin: "30px 400px 10px 400px" }}>
        Painters apply products like paint, wallpaper, and other finishes on
        walls located both indoors and outdoors. Painter tasks include
        discussing job requirements with clients, preparing the job site,
        applying pre-coating agents, leveling surfaces, removing old paint,
        matching colors, filling holes, and cleaning tools.
      </p>

      <br />
      <Nav
        tabs
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NavItem>
          <NavLink href="/paintinggallery">ALL</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/paintinggallery">Oil painting</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/paintinggallery">Sand painting</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/paintinggallery">Pencil Sketch</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/paintinggallery">Digital painting</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

class PaintingGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    let a = [];
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: "Painting",
      }),
    };
    fetch("http://localhost:8000/api/gallery/category", req)
      .then((res) => res.json())
      //   .then((data) => (a = data));
      .then((data) => this.returnUniqueImage(data));
  }

  returnUniqueImage(arr) {
    let imagesArr = arr.artworks.map((item) => item.imagenames);
    let emptyArr = [];
    imagesArr.map((item) => (emptyArr = emptyArr.concat(item)));
    let unique = [...new Set(emptyArr)];

    this.setState({ data: unique });
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
          <PaintNavBar />
        </div>
        {this.state.data !== null && <Paintings data={this.state.data} />}
      </div>
    );
  }
}

class Paintings extends React.Component {
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
          //   return <Tile data={data} key={data.id} />;
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
        // maxWidth: '62vw',
        // maxHeight: '62vw',
        // position: 'fixed',
        // top: '50%',
        // left: '50%',
        // margin: '0',
        // marginTop: '-31vw',
        // marginLeft: '-31vw',
        // boxShadow: '0 0 40px 5px rgba(0, 0, 0, 0.3)',
        // transform: 'none'
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

export default PaintingGallery;
