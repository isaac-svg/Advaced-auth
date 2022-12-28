import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import LoginScreen from "./components/screens/LoginScreen";
import PrivateScreen from "./components/screens/PrivateScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PrivateScreen />} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/register" element={<RegisterScreen />} />
        <Route element={<PrivateRoute />}>
          <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
          <Route
            path="/resetpassword/:resetToken"
            element={<ResetPasswordScreen />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
