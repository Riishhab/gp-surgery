import React from "react";
import { useState } from "react";

const Signup = () => {
  const [data, setData] = useState({
    username: "alexh",
    password: "ioioioio",
    confirmPassword: "ioioioio",
    // userType: "Admin",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost/gpsurgery/signup.php", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-xl">Enter your details</h1>

        <form
          className="form"
          // action="/confirmation"
          // method="POST"
          onSubmit={handleSubmit}
        >
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

          {/* <div className="govuk-form-group">
            <fieldset className="govuk-fieldset">
              <legend className="govuk-fieldset__legend">
                What is your role?
              </legend>
              <div className="govuk-radios" data-module="govuk-radios">
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="patient"
                    name="userType"
                    type="radio"
                    value={data.userType}
                    onChange={handleChange}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor="patient"
                  >
                    Patient
                  </label>
                </div>
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="doctor"
                    name="userType"
                    type="radio"
                    value={data.userType}
                    onChange={handleChange}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor="doctor"
                  >
                    Doctor
                  </label>
                </div>
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="admin"
                    name="userType"
                    type="radio"
                    value={data.userType}
                    onChange={handleChange}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor="admin"
                  >
                    Admin
                  </label>
                </div>
              </div>
            </fieldset>
          </div> */}

          <button className="govuk-button" data-module="govuk-button">
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
