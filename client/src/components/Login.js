import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../misc/ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post("api/user/login", loginUser);
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/admin/dashboard");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <Form className="loginRegisterPage" onSubmit={submit}>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        E-Portfolio Login
      </h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
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
        <p>&nbsp; &nbsp;</p>
        <p>
          <a href="/Register">Click Here to Register</a>
        </p>
      </div>
    </Form>
  );
}
