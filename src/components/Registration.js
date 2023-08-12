import React,{useState,useEffect} from "react";
import { Link ,useNavigate} from "react-router-dom";
import candle from "../Images/candle1.jpg";
import "./Registration.css";
import { FormFeedback} from "reactstrap"
import userService from "../services/userService";
import { message } from "antd";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("")
  const [messages, setMessage] = useState('')
  const Navigate=useNavigate()


const validateEmail = (value) => {
    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value)) {
      setMessage('Please enter a valid email');
    } else {
      setMessage('');
    }
    setEmail(value);
  };

  const validatePassword = (value) => {
    if (
      value === email ||
      value === name ||
      value === '12345678' ||
      value === 'password'
    ) {
      setMessage('Password must not be the same as email, name, 12345678, or password');
    } else if (value.search(/[a-zA-Z]/) < 0) {
      setMessage('Password must contain at least one letter');
    } else if (value.search(/[0-9]/) < 0) {
      setMessage('Password must contain at least one digit');
    } else if (value.search(/[!@#$%^&*]/) < 0) {
      setMessage('Password must contain at least one special character');
    } else {
      setMessage('');
    }
    setPassword(value);
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setMessage('Password and confirm password do not match');
    } else {
      setMessage('');
    }
    setConfirmPassword(value);
  };


function escapeSpecialCharacters(input) {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function handleSubmit(e) {
  e.preventDefault();
  try {
    if (!name || !email || !password || !confirmPassword) {
      setMessage('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Password and confirm password do not match');
      return;
    }
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      return;
    }
    if (
      password === email ||
      password === name ||
      password === '12345678' ||
      password === 'password'
    ) {
      setMessage('Password must not be the same as email, name, 12345678, or password');
      return;
    }
    if (!/[a-zA-Z]/.test(password)) {
      setMessage('Password must contain at least one letter');
      return;
    }
    if (!/\d/.test(password)) {
      setMessage('Password must contain at least one digit');
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setMessage('Password must contain at least one special character');
      return;
    }
    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
      setMessage('Please enter a valid email');
      return;
    }

    // Sanitize user inputs
    const sanitizedEmail = escapeSpecialCharacters(email);
    const sanitizedName = escapeSpecialCharacters(name);
    const sanitizedPassword = escapeSpecialCharacters(password);

    const response = await userService.register({ name: sanitizedName, email: sanitizedEmail, password: sanitizedPassword });

    if (response.data.status) {
      message.success('User registered successfully');
      Navigate('/login');
    } else {
      throw new Error('Error occurred while registering');
    }
  } catch (error) {
    message.error('Failed to register a user. Please try again later');
  }
}

  return (
    <div className="registration-container">
      <div className="registration-wrapper">
        <div className="registration-image">
          <img src={candle} alt="Registration Image" />
        </div>
        <div className="registration-form">
          <h2>Create Account</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text"
                      id="name"
                      name="name" required 
                      placeholder="Enter Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" 
                      id="email" 
                      name="email" required  
                      placeholder="Enter your Email" 
                      value={email}
                      onChange={(e)=>validateEmail(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" 
                      id="password" 
                      name="password" required 
                      placeholder="Enter your Password"
                      value={password}
                      onChange={(e)=>validatePassword(e.target.value)}/>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e)=>validateConfirmPassword(e.target.value)}/>
            </div>
            <div className='form-group'>
       
                  <FormFeedback style={{color:"red",fontSize:"0.8rem"}}>{messages}</FormFeedback>
                
            </div>

            <button type="submit"
            onClick={handleSubmit}>Create Account</button>
          </form>
          <div className="loginform-register">
            <h5>Already have an account ?
              <Link id='link-signin' to='/login'> Login</Link>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
