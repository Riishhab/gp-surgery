import React, { useState, useEffect } from 'react';
import './styles.scss'; 

function AppointmentTable () {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('/api/appointments')
      .then(response => response.json())
      .then(data => setAppointments(data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/appointments/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      setAppointments(appointments.filter(appointment => appointment.id !== id));
    })
    .catch(error => console.error(error));
  };

  return (
    <table class="govuk-table">
        <caption class="govuk-table__caption govuk-table__caption--m">GP appointment</caption>
      <thead class="govuk-table__head">
      <tr class="govuk-table__row">
        <th scope="col" class="govuk-table__header">Date</th>
        <th scope="col" class="govuk-table__header">time</th>
        <th scope="col" class="govuk-table__header">Patient</th>
        <th scope="col" class="govuk-table__header">Doctor</th>
        <th scope="col" class="govuk-table__header">Delete</th>
      </tr>
      </thead>
      <tbody class="govuk-table__body">
        {appointments.map(appointment => (
          <tr class="govuk-table__row" key={appointment.id}>
            <td class="govuk-table__cell">{appointment.date}</td>
            <td class="govuk-table__cell">{appointment.time}</td>
            <td class="govuk-table__cell">{appointment.patientName}</td>
            <td class="govuk-table__cell">{appointment.doctorName}</td>
            <td class="govuk-table__cell">
              <button class="govuk-button govuk-button--warning" data-module="govuk-button" onClick={() => handleDelete(appointment.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AppointmentTable;
