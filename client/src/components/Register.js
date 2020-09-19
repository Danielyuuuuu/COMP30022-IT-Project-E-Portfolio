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
import { Link } from "react-router";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../misc/ErrorNotice";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    // axios({
    //   method: "POST",
    //   data: { email, name, password1, password2 },
    //   withCredentials: true,
    //   url: "http://localhost:8000/user/register",
    // }).then((res) => console.log(res));

    try {
      const newUser = { name, email, password1, password2 };
      await Axios.post("http://localhost:8000/user/register", newUser);
      // const loginRes = await Axios.post("http://localhost:8000/user/login", {
      //   email,
      //   password1,
      // });
      // setUserData({
      //   token: loginRes.data.token,
      //   user: loginRes.data.user,
      // });
      // localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/login");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <Form className="loginRegisterPage" onSubmit={submit}>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
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
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="names">Name</Label>
        <Input
          type="text"
          name="names"
          id="names"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password1"
          id="password1"
          placeholder="Enter Password"
          onChange={(e) => setPassword1(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Confirm Password</Label>
        <Input
          type="password"
          name="password2"
          id="password2"
          placeholder="Confirm Password"
          onChange={(e) => setPassword2(e.target.value)}
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

//export default Register;
