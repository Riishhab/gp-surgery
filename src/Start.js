// Author: Rishab

import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="govuk-grid-row govuk-main-wrapper">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-xl">GP Surgery</h1>
      </div>
      <div className="govuk-grid-column-two-thirds">
        <div className="govuk-body">
          <p>Use this service to:</p>

          <ul className="govuk-list govuk-list--bullet">
            <li>Register and de-register for GP Surgery</li>
            <li>Manage GP Appointments</li>
            <li>Update your name, address or other details</li>
          </ul>

          <p>Registering takes around 5 minutes.</p>

          <Link
            to="/login"
            role="button"
            draggable="false"
            className="govuk-button govuk-button--start govuk-!-margin-top-2 govuk-!-margin-bottom-8"
            data-module="govuk-button"
          >
            Start now
            <svg
              className="govuk-button__start-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="17.5"
              height="19"
              viewBox="0 0 33 40"
              aria-hidden="true"
              focusable="false"
            >
              <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"></path>
            </svg>
          </Link>
        </div>

        <h2 className="govuk-heading-m">Before you start</h2>

        <p>
          You cannot <span style={{ color: "#505a5f" }}>register by post</span>.
        </p>

        <p>
          The online service is currently not{" "}
          <span style={{ color: "#505a5f" }}>
            available in Welsh (ar gael yn Gymraeg)
          </span>
          .
        </p>

        <p>
          You can’t register for this service if you’re in the UK illegally.
        </p>
      </div>

      <div className="govuk-grid-column-one-third">
        <aside className="govuk-prototype-kit-common-templates-related-items">
          <h2 className="govuk-heading-m" id="subsection-title">
            Subsection
          </h2>
          <nav role="navigation" aria-labelledby="subsection-title">
            <ul className="govuk-list govuk-!-font-size-16">
              <li>
                <Link to="/">Related link</Link>
              </li>
              <li>
                <Link to="/">Related link</Link>
              </li>
              <li>
                <Link to="/" className="govuk-!-font-weight-bold">
                  More{" "}
                  <span className="govuk-visually-hidden">in Subsection</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default Start;
