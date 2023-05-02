import React from "react";
import logo from "./assets/images/govuk-crest-2x.png";

const home = () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <img src={logo} alt="photo" />
      </div>
    </div>
  );
};

export default home;
