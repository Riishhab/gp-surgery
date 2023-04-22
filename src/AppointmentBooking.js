import './App.css';
import './styles.scss';
import React, { useState } from "react";

function AppointmentBooking() {
    const today = new Date().toISOString().split("T")[0];
  return (
    <form method="post" action="/book-appointment">
    <fieldset class="govuk-fieldset">
  <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
    <h1 class="govuk-fieldset__heading">
      Book an appointment
    </h1>
  </legend>
  <div class="govuk-form-group">
    <label class="govuk-label" for="appointment-date">
      Date
    </label>
    <input class="govuk-input" id="appointment-date" name="appointment-date" type="date" min={today}></input>
  </div>
  <div class="govuk-form-group">
    <label class="govuk-label" for="appointment-time">
      Time
    </label>
    <input class="govuk-input" id="appointment-time" name="appointment-time" type="time"></input>
  </div>
  <div class="govuk-form-group">
    <label class="govuk-label" for="address-town">
      Notes
    </label>
    <input class="govuk-input govuk-!-width-two-thirds" id="address-town" name="address-town" type="text" ></input>
  </div>
</fieldset>
    </form>
  );
}

export default AppointmentBooking;
