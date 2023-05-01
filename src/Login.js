import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="govuk-grid-row govuk-width-container govuk-!-margin-top-1">
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

        <form className="form" action="/home" method="post">
          <div className="govuk-form-group">
            <p className="govuk-label">Enter your username</p>

            <div className="govuk-hint">This could be upto 15 characters.</div>

            <input
              type="text"
              name="user_id"
              id="user_id"
              className="govuk-input govuk-!-width-three-quarters"
              value=""
              maxlength="22"
              aria-describedby="user_id-hint"
              autocomplete="username"
            />
          </div>

          <div className="govuk-form-group">
            <label for="password" className="govuk-label">
              {" "}
              Password{" "}
            </label>

            <input
              type="password"
              name="password"
              id="password"
              className="govuk-input govuk-!-width-three-quarters"
              autocomplete="current-password"
            />
          </div>

          <button
            type="submit"
            id="continue"
            className="govuk-button"
            formnovalidate=""
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
