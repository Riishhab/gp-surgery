import React from "react";
import { Link, useLocation } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const username = location.state?.data;

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <div className="govuk-panel govuk-panel--confirmation">
          <h1 className="govuk-panel__title">Account Created</h1>
          <div className="govuk-panel__body">
            Your username is
            <br />
            <strong>{username}</strong>
          </div>
        </div>

        {/* <!-- <p>
        We have sent you a confirmation email.
      </p> --> */}

        <h2 className="govuk-heading-m govuk-!-margin-top-5">
          What happens next
        </h2>
        <div className="govuk-body">
          <p>We've sent your details to the GP Surgery.</p>
          <p>
            They may contact you either to confirm your registration, or to ask
            for more information.
          </p>
          <p>
            <Link to="/login">Sign-in to your account now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
