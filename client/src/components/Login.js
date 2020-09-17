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
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();
  // const { setUserData } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:8000/user/login",
        loginUser
      );
      // setUserData({
      //   token: loginRes.data.token,
      //   user: loginRes.data.user,
      // });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/admin/dashboard");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
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
