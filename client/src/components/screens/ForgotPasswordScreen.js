import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./forgotPasswordScreen.css";
const ForgotPasswordScreen = ({}) => {
  const [email, setEmail] = useState("");
  // const [error, setError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.pushState(email, "/");
    }
  }, [history]);
  const forgotpasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <div className="forgotpassword-screen">
      <form
        className="forgotpassword-screen__form"
        onSubmit={forgotpasswordHandler}
      >
        <h3 className="forgotpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message ">{error}</span>}
        {success && <span className="success-message ">{success}</span>}

        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you registered this account with. We
            will send you reset password confirmation email
          </p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
