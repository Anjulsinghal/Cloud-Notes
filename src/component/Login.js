import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      if (localStorage.getItem("token")) {
        // document.body.style.backgroundColor = "#f3f4f8";
      }
      navigate("/");
      props.showAlert("Logged in Successfully ", "success");
    } else {
      props.showAlert("invalid email or password", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="loginpage">
        <form className="loginform" onSubmit={handelSubmit}>
          <h2>Login to Cloud-Notes</h2>
          <div className="form">
            <div className="f1 mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                onChange={onChange}
              />
              <div id="emailHelp" className="small">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="f1 mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={credentials.password}
                name="password"
                placeholder="Enter your password"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="logbotton">
            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={handelSubmit}
            >
              Login
            </button>
            <Link
              className="btn btn-outline-primary "
              to="/signup"
              role="button"
            >
              Sign-Up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
