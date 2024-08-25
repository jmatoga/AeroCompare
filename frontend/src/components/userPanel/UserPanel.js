import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRequest, putRequest } from "../axios_helper.js";
import Cookies from "js-cookie";
import "./UserPanel.css";
import { Button } from "react-bootstrap";

export default function UserPanel({ onLogin }) {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const [user, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(getRequest("/api/currentUser"));
    const fetchData = async () => {
      try {
        getRequest("api/currentUser").then((response) => {
          setUserData(response.data);
          setUserName(`${response.data.name} ${response.data.surname}`);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putRequest("api/userDetails", user)
      .then((res) => {
        alert("Dane zmienione pomyślnie!");
        navigate("/");
      })
      .catch((error) => {
        alert("Wystąpił błąd podczas zmiany danych!");
        console.log(error);
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const allCookies = Cookies.get();
    for (let cookie in allCookies) {
      Cookies.remove(cookie);
    }
    onLogin(false);
    navigate("/");
  };

  return (
    // <div
    //   className="container-fluid d-flex justify-content-center align-items-center"
    //   style={{ min-height: calc(100vh - 60px); /* 60px footer*/   }}
    // >
    // vh-100
    <div className="main-container">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Witaj {`${userName}!`}</h2>
        <div className="signInForm">
          <h5 className="mb-3">Twoje dane:</h5>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                className="form-control"
                name="name"
                placeholder="Imie"
                value={user.name}
                onChange={handleInputChange}
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                name="surname"
                placeholder="Naziwsko"
                value={user.surname}
                onChange={handleInputChange}
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                name="email"
                placeholder="Adres email"
                value={user.email}
                onChange={handleInputChange}
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Hasło"
                onChange={handleInputChange}
              />
            </div>
            {/* {info && <p className="text-danger">{info}</p>} */}
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                type="submit"
                id="SaveChangesButton"
                name="SaveChangesButton"
              >
                Zapisz zmiany
              </Button>
              <Button
                variant="danger"
                type="button"
                id="LogoutButton"
                name="LogoutButton"
                onClick={handleLogout}
              >
                Wyloguj się
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
