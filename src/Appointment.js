
import React, { useState, useEffect, useContext} from "react";
import { UserContext } from "./UserContext";
import "./styles.scss";

const Appointment = () => {
  const { accountNumber } = useContext(UserContext);
  const [appointment, setAppointments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/gpsurgery/AdminAppointment.php')
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        setAppointments(data);
      } else {
        setAppointments([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching medical records:", error);
    });
}, [accountNumber]);

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
            Appointment Number
          </th>
          <th scope="col" className="govuk-table__header">
            NHS Number
          </th>
          <th scope="col" className="govuk-table__header">
            Medical License
          </th>
          <th scope="col" className="govuk-table__header">
            Notes
          </th>
          <th scope="col" className="govuk-table__header">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {appointments.map((appointment) => (
          <tr className="govuk-table__row" key={appointment.id}>
            <td className="govuk-table__cell">
              {appointment.AppointmentNumber}
            </td>
            <td className="govuk-table__cell">
              {appointment.NHSNumber}
            </td>
            <td className="govuk-table__cell">{appointment.medicalLicenseNumber}</td>
            <td className="govuk-table__cell">{appointment.appointentNotes}</td>
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

export default Appointment;
