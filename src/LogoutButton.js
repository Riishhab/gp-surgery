// Author: Rishab

import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import Button from "@govuk-react/button";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear state and localStorage
    logout();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("accountNumber");
    navigate("/");
  };

  return (
    <Button buttonColour="#1d70b8" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
