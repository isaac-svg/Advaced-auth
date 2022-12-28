import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./LoginScreen.css";
const LoginScreen = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.pushState({ email }, " ", "/");
    }
  }, [history]);
  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);
      history.pushState({ data }, " ", "/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <div className="login-screen">
      <form className="login-screen__form" onSubmit={loginHandler}>
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message ">{error}</span>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:
            <Link
              tabIndex={5}
              to="/forgotpassword"
              className="forgotpassword-screen__forgotpassword"
            >
              Forgot Password
            </Link>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex={2}
          />
        </div>

        <button type="submit" className="btn btn-primary" tabIndex={3}>
          Login
        </button>
        <span className="login-screen__subtext">
          Do not have an account?{" "}
          <Link to="/register" tabIndex={4}>
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;
