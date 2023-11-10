import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

// import axios from "axios";
// const URL = import.meta.env.VITE_BASE_URL;
// const USERNAME = import.meta.env.VITE_BASE_USERNAME;
// const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;
// const config = {
//   auth: {
//     username: USERNAME,
//     password: PASSWORD,
//   },
// };

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassWord: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({message : ""});
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClear = (e) => {
    setUser({
      username: "",
      email: "",
      password: "",
      confirmPassWord: "",
    });
    setError(false);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if(user.confirmPassWord === user.password)
      {
        const register = await AuthService.register(
          user.username , 
          user.email ,
          user.password
          )
        navigate("/signin")
      } else {
        setError(true);
        setErrorMessage({message : "Failed! Password mismatched !"});
      }
      // alert("Sign Up");
      // navigate("/signin");
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMessage(error.response.data);
    }
  };
  return (
    <div className="container">
      <h1>Product Management</h1>
      <div className="row form">
        <div className="col-6 card justify-content-center">
          <h5 className="card-header">Register a new User</h5>
          <div className="error">{error && errorMessage.message}</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  value={user.username}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={user.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={user.password}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassWord"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={user.confirmPassWord}
                />
              </div>
              <Link to="" className="btn btn-success" onClick={handleClick}>
                Sign Up
              </Link>{" "}
              <Link to="/" className="btn btn-danger" onClick={handleClear}>
                Cancle
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
