import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const AppointmentDoctor = () => {
  const [appointments, setAppointments] = useState([]);
  const { accountNumber } = useContext(UserContext);

  useEffect(() => {
    fetch(
      `http://localhost:4000/backend/appointment-doctor.php?accountNumber=${accountNumber}`
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

  const handleNotes = (id) => {
    fetch(`/api/appointments/${id}/notes`)
      .then((response) => response.json())
      .then((data) => {
        // Display appointment notes in a modal or overlay on the screen
        console.log(`Notes for appointment ${id}: ${data.notes}`);
      })
      .catch((error) => console.error(error));
  };
  return (
    <table class="govuk-table">
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">
            Appointment ID
          </th>
          <th scope="col" class="govuk-table__header">
            Date
          </th>
          <th scope="col" class="govuk-table__header">
            Time
          </th>
          <th scope="col" class="govuk-table__header">
            Patient
          </th>
          <th scope="col" class="govuk-table__header">
            Doctor
          </th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        {/* it takes information from the array to display in the table */}
        {appointments.map((appointment) => (
          //key is taking everything from the specific id
          <tr class="govuk-table__row" key={appointment.id}>
            <td class="govuk-table__cell">{appointment.id}</td>
            <td class="govuk-table__cell">{appointment.date}</td>
            <td class="govuk-table__cell">{appointment.date}</td>
            <td class="govuk-table__cell">{appointment.time}</td>
            <td class="govuk-table__cell">{appointment.patientName}</td>
            <td class="govuk-table__cell">{appointment.doctorName}</td>
            <td class="govuk-table__cell">
              <button
                class="govuk-button"
                onClick={() => handleNotes(appointment.id)}
              >
                Appointment Notes
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentDoctor;
