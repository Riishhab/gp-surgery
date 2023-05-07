import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorSummary from "@govuk-react/error-summary";
import { hashPassword } from "./Hashing";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [disMessage, setDisMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  }, [errorMessage]);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.username === "" || data.password === "" || data.userType === "") {
      setErrorMessage("Invalid Inputs");
      setDisMessage(
        "Please enter a valid username, password and select a user type"
      );
    } else if (data.username.length < 3 || data.username.length > 15) {
      setErrorMessage("Invalid Username");
      setDisMessage(
        "Username must be at least 3 characters long and less than 15 characters long"
      );
    } else if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setDisMessage("Please enter the same password in both fields");
    } else if (data.password.length < 8 || data.password.length > 16) {
      setErrorMessage("Invalid Password");
      setDisMessage("The password must be between 8 and 16 characters long");
    } else {
      console.log(data);

      const requestData = {
        username: data.username,
        hash: hashPassword(data.password.toString()), // hashing password
        userType: data.userType,
      };

      fetch("http://localhost/gpsurgery/signup.php", {
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
            setErrorMessage("Login Failed");
            setDisMessage(response[0].message);
            console.log(response);
          } else {
            console.log(response);
            navigate("/confirmation", { state: { data: data.username } });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  /*
  if(!preg_match('/[#\$\._!@&]/', $password)) {
    echo json_encode(array("status" => "error", "message" => "Password should contain at least one special character (# $ . _ ! @ &)."));
    exit();
  }
  */

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
  };

  return (
    <div className="govuk-grid-row">
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
        <h1 className="govuk-heading-xl">Enter your details</h1>

        <form className="form" onSubmit={handleSubmit}>
          <p className="govuk-body">
            This will only be used to create an account to use the GP Surgery
            Services.
          </p>

          <div className="govuk-form-group">
            <p className="govuk-label">Create an username</p>

            <div className="govuk-hint">
              This could be upto 15 alphanumeric characters.
            </div>

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
              Create a password
            </label>

            <div className="govuk-hint">
              This should be 8 to 16 alphanumeric characters and a <br />
              special character [# $ . _ ! @ &]
            </div>

            <input
              type="password"
              name="password"
              value={data.password}
              id="password"
              className="govuk-input govuk-!-width-three-quarters"
              autoComplete="current-password"
              onChange={handleChange}
            />
          </div>

          <div className="govuk-form-group">
            <label htmlFor="confirmPassword" className="govuk-label">
              Confirm password
            </label>

            <div className="govuk-hint">
              This should match with the field above.
            </div>

            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              id="confirmPassword"
              className="govuk-input govuk-!-width-three-quarters"
              autoComplete="current-password"
              onChange={handleChange}
            />
          </div>

          <div className="govuk-form-group">
            <fieldset className="govuk-fieldset">
              <legend className="govuk-fieldset__legend">
                What is your role?
              </legend>
              <div className="govuk-radios" data-module="govuk-radios">
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="Patient"
                    name="userType"
                    type="radio"
                    value="Patient"
                    onChange={handleChange}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor="Patient"
                  >
                    Patient
                  </label>
                </div>
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="Doctor"
                    name="userType"
                    type="radio"
                    value="Doctor"
                    onChange={handleChange}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor="Doctor"
                  >
                    Doctor
                  </label>
                </div>
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="Admin"
                    name="userType"
                    type="radio"
                    value="Admin"
                    onChange={handleChange}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor="Admin"
                  >
                    Admin
                  </label>
                </div>
              </div>
            </fieldset>
          </div>

          <button
            className="govuk-button"
            type="submit"
            data-module="govuk-button"
          >
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
