import React from "react";
import {
  Button,
  ButtonToggle,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

import { Link } from "react-router";

class Register extends React.Component {
  render() {
    return (
      <Form className="loginRegisterPage">
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          E-Portfolio Register
        </h2>
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
        <Button color="primary" block>
          Register
        </Button>
        <div className="inlineText">
          <p>Already have an account?</p>
          <p>
            <a href="/Login">&nbsp; Click Here to Login</a>
          </p>
        </div>
      </Form>
    );
  }
}

export default Register;
