import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import candle from "../Images/background.jpg";
import "./LoginPage.css";
import axios from 'axios';
import userService from "../services/userService";
import { message } from "antd";

function Login() {
  const baseurl = 'http://localhost:3000';
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const maxLoginAttempts = 3;
  const lockoutDuration = 60*5; // 60 seconds
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [token, setToken] = useState('');
  const[role,setRole]=useState('');

  const handleCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };



  const handleVerifyCode = (event) => {
    event.preventDefault();

    if (!verificationCode) {
      message.warning('Please enter the verification code');
      return;
    }

    const storedCode = localStorage.getItem('verificationCode');

    if (verificationCode === storedCode && role==='User') {
      message.success('Verification code is correct');
      setIsCodeVerified(true);
      localStorage.setItem('token', token);
      localStorage.setItem('isLogged', true);
      navigate('/');
      
    }

    else {
      message.error('Invalid verification code');
    }
  };


  const handleSubmit = (e) => {
      const generatedCode = Math.floor(1000 + Math.random() * 9000);
      localStorage.setItem('verificationCode', generatedCode.toString());
      e.preventDefault(); // Prevent the default form submission behavior
  
      const loginData = {
          email:email,
          password:password,
          code: generatedCode
      };
  
      const failedAttempts = JSON.parse(localStorage.getItem('failedLoginAttempts')) || {};
      const attemptsForUser = failedAttempts[loginData.email] || 0;
      const lockedOutUntil = JSON.parse(localStorage.getItem('lockedOutUntil')) || {};
      // Check if the account is locked out
      if (attemptsForUser >= maxLoginAttempts) {

          const lockoutTime = lockedOutUntil[loginData.email] || 0;
          const currentTime = Math.floor(Date.now() / 1000);
          if (lockoutTime > currentTime) {
              const remainingLockoutTime = lockoutTime - currentTime;
              return message.error(`Account locked. Try again in ${remainingLockoutTime} seconds.`);
          } else {
              // Reset the failed attempts if the lockout duration has passed
              delete failedAttempts[loginData.email];
              delete lockedOutUntil[loginData.email];
              localStorage.setItem('failedLoginAttempts', JSON.stringify(failedAttempts));
              localStorage.setItem('lockedOutUntil', JSON.stringify(lockedOutUntil));
          }
      }
  
      // Check if both the email and password are provided
      if (!loginData.email || !loginData.password) {
          return message.error("Please fill all the fields");
      }
    
       else {
        
          userService.login(loginData)
              .then(response => {   
                if (response.data.role==='User') {             
                  setIsCodeSent(true);
                  setToken(response.data.token);
                  setRole(response.data.role);
                  message.success('Verification code has been sent to your email address');
                  delete failedAttempts[loginData.email];
                  localStorage.setItem('failedLoginAttempts', JSON.stringify(failedAttempts)); 
                }
                else if (response.data.role==='Admin') {
                  setToken(response.data.token);
                  setRole(response.data.role);
                  message.success('Login Successful');
                  localStorage.setItem('token', token);
                  localStorage.setItem('isLogged', true);
                  navigate('/admin');
                  delete failedAttempts[loginData.email];
                  localStorage.setItem('failedLoginAttempts', JSON.stringify(failedAttempts));   
              }
              }
              )
              .catch(err => {
                  // Increment failed login attempts for the user
                  failedAttempts[loginData.email] = (failedAttempts[loginData.email] || 0) + 1;
                  localStorage.setItem('failedLoginAttempts', JSON.stringify(failedAttempts));
  
                  // Lock the account if the maximum attempts are reached
                  if (failedAttempts[loginData.email] >= maxLoginAttempts) {
                      const currentTime = Math.floor(Date.now() / 1000);
                      const lockoutTime = currentTime + lockoutDuration;
                      lockedOutUntil[loginData.email] = lockoutTime;
                      localStorage.setItem('lockedOutUntil', JSON.stringify(lockedOutUntil));
                      return message.error(`Account locked. Try again in ${lockoutDuration} seconds.`);
                  } else {
                      return message.error(err.response.data.err);
                  }
              });
      }
  }

  return (
    <>
    {!isCodeSent ?  (

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
    ):
    (
        <div className="verify-container">
          
        <form onSubmit={handleVerifyCode}>
          <label htmlFor="verificationCode"> Enter the Verification Code:</label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={handleCodeChange}
            required
          />
          <button type="submit">Verify Code</button>
        </form>
        </div>
        
      )
  }
     </>
  );
}

export default Login;
