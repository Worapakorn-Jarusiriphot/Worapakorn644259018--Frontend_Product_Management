import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useAuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import * as loadingData from "../loading/rainbow.json"
import Swal from 'sweetalert2'

const SignIn = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthContext();
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
    setLoading(true);  // Start loading before the try-catch block
    try {
      const currentUser = await AuthService.login(user.username, user.password);
      login(currentUser);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      setError(true);
    }
    setLoading(false); // Stop loading after the try-catch block is done
  };
  return (
    <div className="signin-container">
      <h1>Product Management</h1>
      {
        !loading ? (
          <div className="signin-card">
            <h2 className="signin-header">Sign In</h2>
            <div className="signin-error">{error && "Something went wrong !! หรือ เกิดข้อผิดพลาด !!"}</div>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
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
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={user.password}
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleClick}>Sign In</button>
              <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear</button>
            </form>
            <div className="signin-footer">
              <Link to="/signup">Don't have an account? Register</Link>
            </div>
          </div>
        ) : (
          <Loading animation={{ ...loadingData }} />
        )
      }
    </div>
  );
};

export default SignIn;