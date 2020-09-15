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

class Login extends React.Component {
  render() {
    return (
      <Form className="loginRegisterPage">
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          E-Portfolio Login
        </h1>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" />
        </FormGroup>
        <p>No Account</p>
        <p>Click Here to Register</p>
        <Button color="primary" block>
          Login
        </Button>
      </Form>
    );
  }
}

export default Login;
