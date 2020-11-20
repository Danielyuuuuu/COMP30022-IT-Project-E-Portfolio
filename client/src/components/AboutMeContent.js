import React, { Component } from "react";

let marked = require("marked");

export default class AboutMe extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: "",
      image: "",
    }
  }

  componentDidMount() {
    fetch("/api/blog/getAboutMe")
      .then((response) => response.json())
      .then((res) => {
        this.setState({ content: res.content,
                        image: res.thumbnails.imagename 
        });
        console.log("Content: ");
        console.log(this.state.content);
        console.log(this.state.image);
      });
  }

  render(){
    return (
      <div className="aboutMe">
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
            marginBottom: 5
          }}>
          <h1>About Me</h1>
        </div>
        <div>
          <img
            src={this.state.image}
            alt=""
            height={400}
            width={400}
            style={{ float: "left", margin: 8 }}
          />
        </div>
        {/* <div>
          {this.state.content}
        </div> */}
        <div dangerouslySetInnerHTML={{ __html: marked(this.state.content) }}/>
      </div>
    );
  }
}

