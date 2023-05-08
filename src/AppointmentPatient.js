import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const AppointmentPatient = () => {
  const { accountNumber } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:4000/backend/appointment-patient.php?accountNumber=${accountNumber}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch appointments.");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          setAppointments([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setAppointments([]);
      });
  }, [accountNumber]);

  //   useEffect(() => {
  //     fetch(
  //       `http://localhost:4000/backend/appointment-patient.php?accountNumber=${accountNumber}`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => setAppointments(data))
  //       .catch((error) => console.error(error));
  //   }, [accountNumber]);

  const handleDelete = (id) => {
    fetch(
      `http://localhost:4000/backend/appointment-patient.php?appointmentNumber=${id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Filter out the deleted appointment
        const updatedAppointments = appointments.filter(
          (appointment) => appointment.appointmentNumber !== id
        );

        // Update the state with the filtered appointments
        setAppointments(updatedAppointments);
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
            Time
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
          <tr className="govuk-table__row" key={appointment.appointmentNumber}>
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
                onClick={() => handleDelete(appointment.appointmentNumber)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentPatient;
