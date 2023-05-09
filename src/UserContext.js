// Author: Rishab

import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" || false
  );

  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || ""
  );
  const [accountNumber, setAccountNumber] = useState(
    localStorage.getItem("accountNumber") || ""
  );

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn !== null) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType !== null) {
      setUserType(storedUserType);
    }
    const storedAccountNumber = localStorage.getItem("accountNumber");
    if (storedAccountNumber !== null) {
      setAccountNumber(storedAccountNumber);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("userType", userType);
  }, [userType]);

  useEffect(() => {
    localStorage.setItem("accountNumber", accountNumber);
  }, [accountNumber]);

  const login = (type, account) => {
    setIsLoggedIn(true);
    setUserType(type);
    setAccountNumber(account);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType("");
    setAccountNumber("");
  };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, userType, accountNumber, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
