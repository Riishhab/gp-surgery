import React from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const Home = () => {
  const { userType } = useContext(UserContext);
  return (
    <div className="govuk-grid-row">
      <div
        className="govuk-panel govuk-panel"
        style={{
          backgroundColor: "#1d70b8",
          color: "#fff",
          height: "17rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="govuk-panel__body">
          <h1 className="govuk-panel__title">
            Welcome to {userType} GP Surgery Services
          </h1>
        </div>
      </div>

      <div className="govuk-grid-column-two-thirds">
        <div
          className="gem-c-govspeak govuk-govspeak "
          data-module="govspeak"
          data-govspeak-module-started="true"
        >
          <div className="govuk-body">
            <p>
              A doctor (also known as a GP or General Practitioner), is the type
              of doctor you will see for general health problems.
            </p>

            <p>
              We recommend that you register with a GP as soon as possible after
              you arrive.
            </p>

            <p>
              An appointment with an NHS (National Health Service) GP is free.
            </p>

            <div
              className="govuk-body"
              style={{
                margin: "2em 0",
                backgroundColor: "#f3f2f1",
                padding: "2em",
              }}
            >
              <p>
                If you were getting treatment for a condition that you need more
                treatment for, it is important that you register with a doctor
                as soon as you can, to make sure your condition is managed
                safely.
              </p>
            </div>

            <p>
              GP surgeries are the first place you can contact if you have a
              health problem. They can treat many illnesses, give health advice,
              and prescribe medicine. They can also refer you to other NHS
              services.
            </p>

            <p>Everyone can register with a GP and you do not need:</p>

            <ul>
              <li>proof of address</li>
              <li>immigration status</li>
              <li>ID</li>
              <li>
                an NHS number (you may be asked for ID but you don’t need to
                show it. If you do have ID it can be used to make sure your name
                is spelled correctly).
              </li>
            </ul>

            <p>You will normally register with a GP close to where you live.</p>

            <p>
              If you expect to be in an area for more than 24 hours but less
              than 3 months, you can register with a GP temporarily.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
