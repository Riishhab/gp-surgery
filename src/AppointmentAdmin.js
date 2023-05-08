// Author: Charlotte, Rishab

import React, { useState, useEffect } from "react";

const AppointmentAdmin = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/backend/appointment-admin.php")
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCancel = async (appointmentNumber) => {
    await fetch(
      `http://localhost:4000/backend/appointment-admin.php?appointmentNumber=${appointmentNumber}`,
      {
        method: "DELETE",
      }
    );

    setAppointments((currentAppointments) =>
      currentAppointments.filter(
        (appointment) => appointment.appointmentNumber !== appointmentNumber
      )
    );
  };

  return (
    <div className="govuk-width-container ">
      <table className="govuk-table">
        <caption className="govuk-table__caption govuk-table__caption--m">
          Medical Records
        </caption>
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th scope="col" className="govuk-table__header">
              Appointment Code
            </th>
            <th scope="col" className="govuk-table__header">
              NHS Number
            </th>
            <th scope="col" className="govuk-table__header">
              Medical License
            </th>
            <th scope="col" className="govuk-table__header">
              Date of Appointment
            </th>
            <th scope="col" className="govuk-table__header">
              Time of Appointment
            </th>
            <th scope="col" className="govuk-table__header">
              Appointment Notes
            </th>
            <th scope="col" className="govuk-table__header">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          {appointments.map((appointment) => (
            <tr
              className="govuk-table__row"
              key={appointment.appointmentNumber}
            >
              <td className="govuk-table__row">
                {appointment.appointmentNumber}
              </td>
              <td className="govuk-table__row">{appointment.NHSNumber}</td>
              <td className="govuk-table__row">
                {appointment.medicalLicenseNumber}
              </td>
              <td className="govuk-table__row">
                {appointment.dateOfAppointment}
              </td>
              <td className="govuk-table__row">
                {appointment.timeOfAppointment}
              </td>
              <td className="govuk-table__row">
                {appointment.appointmentNotes}
              </td>
              <td className="govuk-table__row">
                <button
                  className="govuk-button govuk-button--warning"
                  data-module="govuk-button"
                  onClick={() => handleCancel(appointment.appointmentNumber)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentAdmin;
