import axios from "axios";
import React, { useEffect, useState } from "react";

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.pushState({ privateData }, "/login");
    }
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("api/private", config);

        setPrivateData(data.Data);
      } catch (error) {
        setError("You are not authorised to access please Login");
      }
    };
    fetchPrivateData();
  }, [history]);
  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.pushState("/login");
  };
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <React.Fragment>
      <div style={{ backgroundColor: "green", color: "white" }}>
        {privateData}
      </div>
      <button onClick={logoutHandler}>Logout</button>
    </React.Fragment>
  );
};

export default PrivateScreen;
