import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function MainPanel() {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-3 rounded w-25 text-center">
      <h1 className="mb-4">
        Welcome to Aero Compare - MAIN PAGE<br></br>
        <br></br>
      </h1>
    </div>
  );
}
