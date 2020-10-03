import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "../App.css";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

class ContactMeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
      profilePhotos: [
        "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
        "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
        "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
        "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
        "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
        "https://react.semantic-ui.com/images/avatar/small/steve.jpg",
        "https://react.semantic-ui.com/images/avatar/small/christian.jpg",
      ],
      error: "",
    };
  }

  submit = async (e) => {
    e.preventDefault();

    try {
      const newContactMe = {
        name: this.state.name,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message,
        profilePhoto: this.state.profilePhotos[
          Math.floor(Math.random() * this.state.profilePhotos.length)
        ],
      };
      await Axios.post("api/contactMe/addContactMe", newContactMe);
      this.setState({ error: "Submit successful" });
    } catch (err) {
      this.setState({ error: err.response.data.msg });
    }
  };

  render() {
    return (
      <Form className="ContactMeForm" onSubmit={this.submit}>
        {this.state.error && (
          <ErrorNotice
            message={this.state.error}
            clearError={() => this.setState({ error: "" })}
          />
        )}
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="subject">Subject</Label>
          <Input
            type="text"
            name="subject"
            id="subject"
            placeholder="Enter the subject"
            onChange={(e) => this.setState({ subject: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="message">Leave me a message</Label>
          <Input
            type="textarea"
            name="message"
            id="message"
            placeholder="Enter the message"
            onChange={(e) => this.setState({ message: e.target.value })}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default ContactMeForm;
