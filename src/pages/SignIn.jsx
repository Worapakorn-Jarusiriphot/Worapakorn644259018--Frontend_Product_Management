import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useAuthContext } from "../context/AuthContext";

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
const SignIn = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const {login} = useAuthContext();
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClear = (e) => {
    setUser({
      username: "",
      password: "",
    });
    setError(false);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      //alert("Sign In");
      // await axios.post(`${URL}/products`, product, config);
      
      const currentUser = await AuthService.login(user.username, user.password);
      login(currentUser);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  return (
    <div className="container">
      <h1>Product Management</h1>
      <div className="row form">
        <div className="col-6 card justify-content-center">
          <h5 className="card-header">Sign In</h5>
          <div className="error">{error && "Somthing went wrong !!"}</div>
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
              <Link to="" className="btn btn-success" onClick={handleClick}>
                Sign In
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

export default SignIn;