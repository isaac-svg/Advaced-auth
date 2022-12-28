import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./ResetPasswordScreen.css";
const RegisterScreen = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.pushState("/");
    }
  }, [history]);
  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError(" ");
      }, 3000);
      setSuccess(data.data);
      return setError("Passwords do not match");
    }
    try {
      const { data } = await axios.put(
        `/api/auth/passwordreset/${match.params.resetToken}`,
        { password },
        config
      );

      localStorage.setItem("authToken", data.token);
      history.pushState("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <div className="register-screen">
      <form className="register-screen__form" onSubmit={registerHandler}>
        <h3 className="forgotpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message ">{error}</span>}
        {success && (
          <span className="success-message ">
            <Link to="/login">Login</Link>
          </span>
        )}

        <div className="form-group">
          <label htmlFor="password"> New Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmpassword"
            placeholder="Enter Password"
            required
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;
