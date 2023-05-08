import React, { useState } from "react";
import jq from "jquery";
import $ from "jquery";

function AppointmentBooking() {
  const today = new Date(); //Gets todays date
  const todayString = today.toISOString().split("T")[0]; //formats the date as a string using ISO 8601 format, T splits it between date and time then [0] selects the date
  const nextWeek = new Date(); //Gets todays date
  nextWeek.setDate(today.getDate() + 7); //adds 7 days onto todays date (exactly one week)
  const nextWeekString = nextWeek.toISOString().split("T")[0]; //formats the date as a string using ISO 8601 format, T splits it between date and time then [0] selects the date

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      date: $("#appointment-date").val(),
      time: $("#appointment-time").val(),
      notes: $("#appointment-notes").val(),
    };
    var url_appointment = "http://localhost:4000/backend/book-appointment.php";

    jq.ajax({
      type: "POST",
      url: url_appointment,
      mode: "no-core",
      data: formData,
      success(data) {
        setErrorMessage("");
        setSuccessMessage("Appointment successfully booked!");
      },
      error(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        setSuccessMessage("");
        setErrorMessage(
          "Error booking appointment. Please Select a different date/time."
        );
      },
    });
  };

  return (
    <div>
      {successMessage && (
        <div
          className="govuk-notification-banner govuk-notification-banner--success"
          role="alert"
          aria-labelledby="govuk-notification-banner-title"
          data-module="govuk-notification-banner"
        >
          <div className="govuk-notification-banner__header">
            <h2
              className="govuk-notification-banner__title"
              id="govuk-notification-banner-title"
            >
              Success
            </h2>
          </div>
          <div className="govuk-notification-banner__content">
            <h3 class="govuk-notification-banner__heading">{successMessage}</h3>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="govuk-error-summary" data-module="govuk-error-summary">
          <div role="alert">
            <h2 className="govuk-error-summary__title">Error</h2>
            <div className="govuk-error-summary__body">
              <h3 className="govuk-notification-banner__heading">
                {errorMessage}
              </h3>
            </div>
          </div>
        </div>
      )}
      <form className="AppointmentBooking">
        <h1 className="govuk-heading-xl">
          <span className="govuk-caption-xl">Appointment Booking</span>
          Book an Appointment with us
        </h1>
        <fieldset className="govuk-fieldset">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">
              Enter Appointment Details
            </h1>
          </legend>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="appointment-date">
              Date
            </label>
            <input
              className="govuk-input govuk-input--width-10"
              id="appointment-date"
              name="appointment-date"
              type="date"
              min={todayString}
              max={nextWeekString}
            ></input>
          </div>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="appointment-time">
              Time
            </label>
            <select
              className="govuk-select govuk-input--width-20"
              id="appointment-time"
              name="appointment-time"
            >
              <option value="null">Select a Time</option>
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
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="appointment-notes">
              If necessary please provide some notes
            </label>
            <textarea
              className="govuk-textarea govuk-input--width-20"
              id="appointment-notes"
              name="appointment-notes"
              rows="5"
            ></textarea>
          </div>
          <button
            className="govuk-button"
            datamodule="govuk-button"
            type="submit"
            onClick={handleSubmit}
          >
            Confirm and Book
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default AppointmentBooking;
