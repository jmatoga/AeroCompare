import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Validation from "./RegisterValidation";
import axios from "axios";

export default function RegisterPanel() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (
      validationErrors.email === "" &&
      validationErrors.password === "" &&
      validationErrors.confirmPassword === ""
    ) {
      axios
        .post("http://localhost:8090/api/auth/register", values)
        .then((response) => {
          //Cookies.set("accessToken", response.data.token);
          //onRegister(true);
          navigate("/");
        })
        .catch((error) => {
          if (error.response) {
            console.log("Server responded with an error:", error.response.data);
            if (error.response.status === 400) {
              alert("Invalid data. Please try again.");
              sessionStorage.clear();
            } else {
              alert("An error occurred. Please try again later.");
            }
          } else if (error.request) {
            console.log("No response received:", error.request);
            alert(
              "No response received from the server. Please try again later."
            );
          } else {
            console.log("Error setting up the request:", error.message);
            alert("Error setting up the request. Please try again later.");
          }
          console.log(error);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25 text-center">
        <h1 className="mb-4">
          Welcome to Aero Compare<br></br>
          <br></br>
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <h3 className="text-center">
              Create your account<br></br>
              <br></br>
            </h3>
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter E-mail"
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.email && (
              <p style={{ color: "red", marginTop: "5px" }}>{errors.email}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.password && (
              <p style={{ color: "red", marginTop: "5px" }}>
                {errors.password}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">
              <b>Confirm Password</b>
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.confirmPassword && (
              <p style={{ color: "red", marginTop: "5px" }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
