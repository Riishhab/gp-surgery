import './styles.scss';
import React from "react";

function AppointmentBooking() {
    const today = new Date(); //Gets todays date
    const todayString = today.toISOString().split("T")[0]; //formats the date as a string using ISO 8601 format, T splits it between date and time then [0] selects the date
    const nextWeek = new Date(); //Gets todays date
    nextWeek.setDate(today.getDate() + 7); //adds 7 days onto todays date (exactly one week)
    const nextWeekString = nextWeek.toISOString().split("T")[0]; //formats the date as a string using ISO 8601 format, T splits it between date and time then [0] selects the date
  return (
      <div class="AppointmentBooking">
    <form method="post" action="/book-appointment">
    <h1 class="govuk-heading-xl">
  <span class="govuk-caption-xl">Appointment Booking</span>
  Book an Appointment with us
</h1>
    <fieldset class="govuk-fieldset">
  <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
    <h1 class="govuk-fieldset__heading">
      Enter Appointment Details
    </h1>
  </legend>
  <div class="govuk-form-group">
    <label class="govuk-label" for="appointment-date">
      Date
    </label>
    <input class="govuk-input govuk-input--width-10" id="appointment-date" name="appointment-date" type="date" min={todayString} max={nextWeekString}></input>
  </div>
  <div class="govuk-form-group">
    <label class="govuk-label" for="appointment-time">
      Time
    </label>
    <select class="govuk-select govuk-input--width-20" id="appointment-time" name="appointment-time">
        <option>Select a Time</option>
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
    </select>
  </div>
  <div class="govuk-form-group">
    <label class="govuk-label" for="appointment-time">
      If necessary please provide some notes
    </label>
    <textarea class="govuk-textarea govuk-input--width-20" id="appointment-time" name="appointment-time" rows="5"></textarea>
  </div>
  <button class="govuk-button" data-module="govuk-button" type="submit">
  Confirm and Book
</button>
</fieldset>
    </form>
    </div>
  );
}

export default AppointmentBooking;
