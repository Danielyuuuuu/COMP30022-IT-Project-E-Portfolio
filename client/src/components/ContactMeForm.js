import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class ContactMeForm extends React.Component {
  render() {
    return (
      <Form className="ContactMeForm">
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="subject">Subject</Label>
          <Input
            type="text"
            name="subject"
            id="subject"
            placeholder="Enter the subject"
          />
        </FormGroup>
        <FormGroup>
          <Label for="message">Leave me a message</Label>
          <Input
            type="textarea"
            name="message"
            id="message"
            placeholder="Enter the message"
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default ContactMeForm;
