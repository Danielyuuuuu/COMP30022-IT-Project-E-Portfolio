import React, { Component } from "react";
import { Comment } from "semantic-ui-react";
import Axios from "axios";
import "../../../App.css";

export default class ContactMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactMes: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/contactMe/getContactMe")
      .then((response) => response.json())
      .then((res) => {
        this.setState({ contactMes: res });
      });
  }

  handleDelete = (e) => {
    console.log("ContactMe deleted: " + e);
    Axios.delete(
      "http://localhost:8000/api/contactMe/deleteContactMe/" + e
    ).catch((err) => {
      console.log(Error);
    });
    window.location.reload(false);
  };

  render() {
    return (
      <div>
        <Comment.Group size="massive">
          {this.state.contactMes.map((contactMe) => {
            return (
              <div className="flexDisplay">
                <Comment>
                  <Comment.Avatar
                    as="a"
                    src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
                  />
                  <Comment.Content>
                    <Comment.Author as="a">{contactMe.name}</Comment.Author>
                    <Comment.Metadata className="floatRight">
                      <div>
                        {/* <p>&nbsp; &nbsp;</p> */}
                        <button
                          className="deleteButton"
                          onClick={() => this.handleDelete(contactMe._id)}
                        >
                          <i className="fas fa-times"></i>
                        </button>{" "}
                      </div>
                    </Comment.Metadata>
                    <Comment.Metadata>
                      <div>{contactMe.date.slice(0, 10)}</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      <div>Email: {contactMe.email}</div>
                      <div>Subject: {contactMe.subject}</div>
                      <div>Message: {contactMe.message}</div>
                    </Comment.Text>
                  </Comment.Content>
                </Comment>
              </div>
            );
          })}
        </Comment.Group>
      </div>
    );
  }
}
