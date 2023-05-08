// Author: Rishab

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";
import ErrorSummary from "@govuk-react/error-summary";
import { comparePassword } from "./Hashing";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [disMessage, setDisMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  }, [errorMessage]);

  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.username === "" || data.password === "") {
      setErrorMessage("Invalid Inputs");
      setDisMessage("Please enter a valid username and password");
    } else {
      const requestData = {
        username: data.username,
      };
      fetch("http://localhost:4000/backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response[0].status === "error") {
            setErrorMessage("Invalid Login");
            setDisMessage("Please enter a valid username and password");
            console.log(response);
          } else {
            if (comparePassword(data.password, response[0].storedHash)) {
              console.log(response);
              login(response[0].userType, response[0].accountNumber);
              navigate("/home");
            } else {
              setErrorMessage("Invalid Login");
              setDisMessage("Please enter a valid username and password");
            }
          }
        });
    }
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
  };

  return (
    <div className="govuk-grid-row govuk-!-margin-top-1">
      {errorMessage && (
        <ErrorSummary
          description="Please fix the following issues:"
          errors={[
            {
              targetName: "description",
              text: disMessage,
            },
          ]}
          heading={errorMessage}
        />
      )}

      <div className="govuk-grid-column-two-thirds">
        <div
          className="govuk-notification-banner"
          role="region"
          aria-labelledby="govuk-notification-banner-title"
          data-module="govuk-notification-banner"
        >
          <div className="govuk-notification-banner__header">
            <h2
              className="govuk-notification-banner__title"
              id="govuk-notification-banner-title"
            >
              Keeping your information secure
            </h2>
          </div>
          <div className="govuk-notification-banner__content">
            <p className="govuk-body">
              Do not share your GP Surgery username and password with anyone
              else.
            </p>
          </div>
        </div>

        <h1 className="govuk-heading-xl">Login to GP Surgery</h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="govuk-form-group">
            <p className="govuk-label">Enter your username</p>

            <div className="govuk-hint">This could be upto 15 characters.</div>

            <input
              type="text"
              name="username"
              id="user_id"
              className="govuk-input govuk-!-width-three-quarters"
              value={data.username}
              maxLength={15}
              aria-describedby="user_id-hint"
              autoComplete="username"
              onChange={handleChange}
            />
          </div>

          <div className="govuk-form-group">
            <label htmlFor="password" className="govuk-label">
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              className="govuk-input govuk-!-width-three-quarters"
              autoComplete="current-password"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            id="continue"
            className="govuk-button"
            // formNoValidate=""
            data-module="govuk-button"
            data-prevent-double-click="true"
          >
            Sign in
          </button>
        </form>

        <h2 className="govuk-heading-m">New users of GP Surgery</h2>

        <div className="govuk-body">
          <Link className="govuk-link" id="no-account" to="/signup">
            Create sign in details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
