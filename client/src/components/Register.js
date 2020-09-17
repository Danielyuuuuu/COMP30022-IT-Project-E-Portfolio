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
import { Link } from "react-router";
import userContext from "../context/userContext";

export default function Register() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: "",
  //     names: "",
  //     password1: "",
  //     password2: "",
  //   };

  //   this.handleInputChange = this.handleInputChange.bind(this);
  // }

  // handleSubmit(event) {
  //   event.preventDefault();

  //   const user = {
  //     email: this.state.email,
  //     names: this.state.names,
  //     password1: this.state.password1,
  //     password2: this.state.password2,
  //   };

  //   axios.post("http://localhost:8000/register", { user }).then((res) => {
  //     console.log(res);
  //     console.log(res.data);
  //   });
  // }

  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value,
  //   });
  // }

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const submit = () => {
    // e.preventDefault();

    axios({
      method: "POST",
      data: { email, name, password1, password2 },
      withCredentials: true,
      url: "http://localhost:8000/user/register",
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
      <Button onClick={submit} color="primary" block>
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
