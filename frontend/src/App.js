import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navBar/NavBar";
import LoginPanel from "./components/loginPanel/LoginPanel";
import Cookies from "js-cookie";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserPanel from "./components/userPanel/UserPanel";
import MainPanel from "./components/mainPanel/MainPanel";
import RegisterPanel from "./components/registerPanel/RegisterPanel";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("accessToken"));

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get("accessToken"));
  }, []);

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Navbar className="header" onLogin={setIsLoggedIn} />}
        <div className="flex-grow-1">
          <Routes>
            <Route
              path="/login"
              element={
                !isLoggedIn ? (
                  <LoginPanel onLogin={setIsLoggedIn} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/register"
              element={!isLoggedIn ? <RegisterPanel /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={isLoggedIn ? <MainPanel /> : <Navigate to="/login" />}
            />
            <Route
              path="/user"
              element={
                isLoggedIn ? (
                  <UserPanel onLogin={setIsLoggedIn} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer className="footer" />
      </div>
    </Router>
  );
}
