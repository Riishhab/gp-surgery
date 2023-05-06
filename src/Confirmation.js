import React from "react";
import { Link, useLocation } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const username = location.state?.data;

  return (
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <div class="govuk-panel govuk-panel--confirmation">
          <h1 class="govuk-panel__title">Account Created</h1>
          <div class="govuk-panel__body">
            Your username is
            <br />
            <strong>{username}</strong>
          </div>
        </div>

        {/* <!-- <p>
        We have sent you a confirmation email.
      </p> --> */}

        <h2 class="govuk-heading-m govuk-!-margin-top-5">What happens next</h2>
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
  );
};

export default Confirmation;
