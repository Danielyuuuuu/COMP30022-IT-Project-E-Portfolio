import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class Register extends React.Component {
  render() {
    return (
      <Form className="loginRegisterPage">
        <h1 className="textCenter">E-Portfolio Register</h1>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" placeholder="Enter Name" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password1"
            placeholder="Enter Password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Confirm Password</Label>
          <Input
            type="password"
            name="password"
            id="password2"
            placeholder="Confirm Password"
          />
        </FormGroup>
        <p>Already have an account?</p>
        <p>Click Here to Login</p>
        <Button>Register</Button>
      </Form>
    );
  }
}

export default Register;
