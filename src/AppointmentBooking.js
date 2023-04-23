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
    <input class="govuk-input govuk-input--width-20" id="appointment-date" name="appointment-date" type="date" min={today}></input>
  </div>
  <div class="govuk-form-group">
    <label class="govuk-label" for="appointment-time">
      Time
    </label>
    <select class="govuk-select govuk-input--width-20" id="appointment-time" name="appointment-time">
        <option value="08:30">08:30</option>
        <option value="09:00">09:00</option>
        <option value="09:30">09:30</option>
        <option value="10:00">10:00</option>
        <option value="10:30">10:30</option>
        <option value="11:00">11:00</option>
        <option value="11:30">11:30</option>
        <option value="12:00">12:00</option>
        <option value="12:30">12:30</option>
        <option value="13:00">13:00</option>
        <option value="13:30">13:30</option>
        <option value="14:00">14:00</option>
        <option value="14:30">14:30</option>
        <option value="15:00">15:00</option>
        <option value="15:30">15:30</option>
        <option value="16:00">16:00</option>
        <option value="16:30">16:30</option>
        <option value="17:00">17:00</option>
        <option value="17:30">17:30</option>
        <option value="18:00">18:00</option>
        <option value="18:30">18:30</option>
    </select>
  </div>
  <div class="govuk-form-group">
    <label class="govuk-label" for="appointment-time">
      Notes
    </label>
    <input class="govuk-input govuk-input--width-20" id="appointment-time" name="appointment-time" type="text" ></input>
  </div>
  <button class="govuk-button" data-module="govuk-button" type="submit">
  Confirm and Book
</button>
</fieldset>
    </form>
  );
}

export default AppointmentBooking;
