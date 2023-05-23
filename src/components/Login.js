import React, { useState } from "react";
import { Link } from "react-router-dom";
import candle from "../Images/background.jpg";
import "./LoginPage.css";
import userService from "../services/userService";
import { message } from "antd";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[isLogged, setIsLogged] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    userService.login({ email, password })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        message.success("Login Successful");
        window.location = "/";
        setIsLogged(true);
      }
      )
      .catch((err) => window.alert(err.response.data.error));
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-image">
          <img src={candle} alt="Login Image" />
        </div>
        <div className="login-form">
          <h2>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit">Login</button>
          </form>
          <div className="loginform-register">
            <h5>
              Don't have an account?{" "}
              <Link id="link-register" to='/register'>
                Register
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
