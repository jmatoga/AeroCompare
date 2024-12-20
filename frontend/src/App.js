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
import WelcomePanel from "./components/welcomePanel/WelcomePanel";
import Cookies from "js-cookie";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserPanel from "./components/userPanel/UserPanel";
import MainPanel from "./components/mainPanel/MainPanel";
import FavouritesPanel from "./components/favouritesPanel/FavouritesPanel";
import RegisterPanel from "./components/registerPanel/RegisterPanel";
import AdminPanel from "./components/adminPanel/AdminPanel";
import { createTheme, ThemeProvider } from "@mui/material";
import HistoryPanel from "./components/historyPanel/HistoryPanel";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("accessToken"));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get("accessToken"));
    setIsAdmin(false);
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        // main: "#0ab9b6",
        main: "#00D1CD",
      },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          {isLoggedIn && <Navbar className="header" isAdmin={isAdmin} />}
          <div className="flex-grow-1">
            <Routes>
              <Route
                path="/welcome"
                element={!isLoggedIn ? <WelcomePanel /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={
                  !isLoggedIn ? (
                    <LoginPanel onLogin={setIsLoggedIn} isAdmin={setIsAdmin} />
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
                element={
                  isLoggedIn ? <MainPanel /> : <Navigate to="/welcome" />
                }
              />
              <Route
                path="/favourites"
                element={
                  isLoggedIn ? <FavouritesPanel /> : <Navigate to="/welcome" />
                }
              />
              <Route
                path="/history"
                element={
                  isLoggedIn ? <HistoryPanel /> : <Navigate to="/welcome" />
                }
              />
              <Route
                path="/admin"
                element={
                  isLoggedIn && isAdmin ? (
                    <AdminPanel />
                  ) : (
                    <Navigate to="/welcome" />
                  )
                }
              />
              <Route
                path="/user"
                element={
                  isLoggedIn ? (
                    <UserPanel onLogin={setIsLoggedIn} isAdmin={setIsAdmin} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/welcome" />} />
            </Routes>
          </div>
          {/* <Footer className="footer" /> */}
        </div>
      </ThemeProvider>
    </Router>
  );
}
