import { useState } from 'react';
import './styles.scss';

function Appointment() {
  const [nhsNumber, setNhsNumber] = useState('');
  const [date, setDate] = useState('');
  const [appointments, setAppointments] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/appointments?nhsNumber=${nhsNumber}&date=${date}`);
    const data = await response.json();
    setAppointments(data);
  };

  const handleDelete = async (appointmentNumber) => {
    await fetch(`/api/appointments/${appointmentNumber}`, { method: 'DELETE' });
    setAppointments((currentAppointments) =>
      currentAppointments.filter((appointment) => appointment.appointment_number !== appointmentNumber)
    );
  };

  return (
        <>
        <div class="govuk-width-container ">
            <h2 class="govuk-cookie-banner__heading govuk-heading-m">GP Appointments</h2>
            <form  onSubmit={handleSubmit}>
                <label class="govuk-label govuk-label--3" htmlFor="nhsNumber">NHS Number:</label>
                <input class="govuk-label" for="width-8" type="text" id="nhsNumber" value={nhsNumber} onChange={(event) => setNhsNumber(event.target.value)} />
                <label class="govuk-label govuk-label--3" htmlFor="date">Date of Appointment:</label>
                <input class="govuk-label" for="width-5"type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} />
                <button class="govuk-button" data-module="govuk-button" type="submit">Search</button>
            </form>
            <table class="govuk-table">
                <thead class="govuk-table__head">
                <tr class="govuk-table__row">
                    <th scope="col" class="govuk-table__header">Appointment Number</th>
                    <th scope="col" class="govuk-table__header">NHS Number</th>
                    <th scope="col" class="govuk-table__header">Medical License</th>
                    <th scope="col" class="govuk-table__header">Date of Appointment</th>
                    <th scope="col" class="govuk-table__header">Time of Appointment</th>
                    <th scope="col" class="govuk-table__header">Appointment Notes</th>
                    <th scope="col" class="govuk-table__header">Actions</th>
                </tr>
                </thead>
                <tbody class="govuk-table__body">
                {appointments.map((appointment) => (
                    <tr class="govuk-table__row" key={appointment.appointment_number}>
                    <td class="govuk-table__row">{appointment.appointment_number}</td>
                    <td class="govuk-table__row">{appointment.nhs_number}</td>
                    <td class="govuk-table__row">{appointment.medical_license}</td>
                    <td class="govuk-table__row">{appointment.date_of_appointment}</td>
                    <td class="govuk-table__row">{appointment.time_of_appointment}</td>
                    <td class="govuk-table__row">{appointment.appointment_notes}</td>
                    <td class="govuk-table__row">
                        <button class="govuk-button govuk-button--warning" data-module="govuk-button" onClick={() => handleDelete(appointment.appointment_number)}>Delete</button>
                    </td>
                    </tr>

                ))}
            </tbody>
            </table>
        </div>

        
        </>
    );
  }
  
  export default Appointment;
  