import React from "react";
import { useState, useEffect } from "react";
import userService from "../../../services/userService";
import './Users.css';

function Users() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    userService.getUser().then((res) => {
      setUserData(res.data.data);
    });
  }, []);

  

  return (
    <div className="user-table-container">
      <h1>Users</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>   
            <th>Role</th>
            <th>Username</th>
        
          </tr>
        </thead>
        
          {userData.map((user) => (
            <tbody>
            <tr key={user.id}>
              <td>{user.fname} {user.lname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.username}</td>  
                       
            </tr>
            </tbody>
          ))}
      
      </table>
    </div>
  );
}

export default Users;
