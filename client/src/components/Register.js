import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../misc/ErrorNotice";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState();
  const [severity, setSeverity] = useState("error");

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { name, email, password1, password2 };
      await Axios.post("api/user/register", newUser);
      history.push("/login");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const setEmailAddress = async (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const setUserName = async (e) => {
    setName(e.target.value);
    setError("");
  };

  const setUserPassword1 = async (e) => {
    setPassword1(e.target.value);
    setError("");
  };

  const setUserPassword2 = async (e) => {
    setPassword2(e.target.value);
    setError("");
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
        E-Portfolio Register
      </h2>
      {error && (
        <ErrorNotice message={error} severity={severity} clearError={() => setError(undefined)} />
      )}
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          onChange={setEmailAddress}
        />
      </FormGroup>
      <FormGroup>
        <Label for="names">Name</Label>
        <Input
          type="text"
          name="names"
          id="names"
          placeholder="Enter Name"
          onChange={setUserName}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password1"
          id="password1"
          placeholder="Enter Password"
          onChange={setUserPassword1}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Confirm Password</Label>
        <Input
          type="password"
          name="password2"
          id="password2"
          placeholder="Confirm Password"
          onChange={setUserPassword2}
        />
      </FormGroup>
      <Button color="primary" block>
        Register
      </Button>
      <div className="inlineText">
        <p>Already have an account?</p>
        <p>&nbsp;&nbsp;</p>
        <p>
          <a href="/Login">Click Here to Login</a>
        </p>
      </div>
    </Form>
  );
}
