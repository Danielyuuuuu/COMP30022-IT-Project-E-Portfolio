import React, { useState, useContext } from "react";
import {
  Button,
  ButtonToggle,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    // e.preventDefault();

    axios({
      method: "GET",
      data: { email, password },
      withCredentials: true,
      url: "http://localhost:8000/user/login",
    }).then((res) => console.log(res));
  };

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
        <Input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <Button onClick={submit} color="primary" block>
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

// export default Login;
