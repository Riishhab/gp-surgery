import React from "react";

const Signup = () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-xl">Enter your details</h1>

        <form className="form" action="/confirmation" method="post">
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
              Create a password{" "}
            </label>

            <div className="govuk-hint">
              This should be 8 to 16 alphanumeric characters and a <br />
              special character [# $ . _ ! @ &]
            </div>

            <input
              type="password"
              name="password"
              id="password"
              className="govuk-input govuk-!-width-three-quarters"
              autocomplete="current-password"
            />
          </div>

          <div className="govuk-form-group">
            <label for="password" className="govuk-label">
              Confirm password
            </label>

            <div className="govuk-hint">
              This should match with the field above.
            </div>

            <input
              type="password"
              name="password"
              id="password"
              className="govuk-input govuk-!-width-three-quarters"
              autocomplete="current-password"
            />
          </div>

          <button className="govuk-button" data-module="govuk-button">
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
