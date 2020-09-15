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
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          E-Portfolio Login
        </h2>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" />
        </FormGroup>
        <Button color="primary" block>
          Login
        </Button>
        <div className="inlineText">
          <p>No Account?</p>
          <p>
            <a href="/Register">&nbsp; Click Here to Register</a>
          </p>
        </div>
      </Form>
    );
  }
}

export default Login;
