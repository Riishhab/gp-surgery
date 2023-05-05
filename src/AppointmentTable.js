import React, { useState, useEffect } from "react";
import "./styles.scss";

function AppointmentTable() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost/gpsurgery/api.php")
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/appointments/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setAppointments(
          appointments.filter((appointment) => appointment.id !== id)
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <table className="govuk-table">
      <caption className="govuk-table__caption govuk-table__caption--m">
        GP appointment
      </caption>
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th scope="col" className="govuk-table__header">
            Date
          </th>
          <th scope="col" className="govuk-table__header">
            time
          </th>
          <th scope="col" className="govuk-table__header">
            Patient
          </th>
          <th scope="col" className="govuk-table__header">
            Doctor
          </th>
          <th scope="col" className="govuk-table__header">
            Delete
          </th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {appointments.map((appointment) => (
          <tr className="govuk-table__row" key={appointment.id}>
            <td className="govuk-table__cell">
              {appointment.dateOfAppointment}
            </td>
            <td className="govuk-table__cell">
              {appointment.timeOfAppointment}
            </td>
            <td className="govuk-table__cell">{appointment.patientName}</td>
            <td className="govuk-table__cell">{appointment.doctorName}</td>
            <td className="govuk-table__cell">
              <button
                className="govuk-button govuk-button--warning"
                data-module="govuk-button"
                onClick={() => handleDelete(appointment.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AppointmentTable;
