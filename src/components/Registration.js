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

  useEffect(() => {
    if (password !== confirmPassword) {
        setMessage('password and confirm password does not match')
        return
    }
    else if( password.length>0 && password.length < 8){
      setMessage('Password must be atleast 8 characters long')
      return
    }
    else if (password.length>0 && password.search(/[a-z]/i) < 0) {
      setMessage('Password must contain atleast one letter')
      return
    }
    else if (password.length>0 && password.search(/[0-9]/) < 0) {
      setMessage('Password must contain atleast one digit')
      return
    }
    else if (password.length>0 && password.search(/[!@#$%^&*]/) < 0) {
      setMessage('Password must contain atleast one special character')
      return
    }
    
    
    setMessage('')

}, [confirmPassword])

 

async function handleSubmit(e) {
  e.preventDefault();
  try {
    if (!name || !email || !password || !confirmPassword) {
      throw new Error('All fields are required')
    }
    
   
    const response = await userService.register({ name, email, password })

    if (response.data.status) {
      message.success("User registered Successful")
      Navigate('/login')
    } else {
      throw new Error('Error occurred while registering')
    }
  } catch (error) {
    message.error('Failed to register an user. Please try again later')
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
                      onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" 
                      id="password" 
                      name="password" required 
                      placeholder="Enter your Password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}/>
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
                onChange={(e)=>setConfirmPassword(e.target.value)}/>
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
