import { useState, useEffect } from "react";

function Appointment() {
  const [NHSNumber, setNhsNumber] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/backend/appointment-admin.php")
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/appointments?nhsNumber=${NHSNumber}`);
    const data = await response.json();
    setAppointments(data);
  };

  const handleDelete = async (appointmentNumber) => {
    await fetch(`/api/appointments/${appointmentNumber}`, { method: "DELETE" });
    setAppointments((currentAppointments) =>
      currentAppointments.filter(
        (appointment) => appointment.appointmentNumber !== appointmentNumber
      )
    );
  };

  return (
    <>
      <div className="govuk-width-container ">
        <h2 className="govuk-cookie-banner__heading govuk-heading-m">
          GP Appointments
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="govuk-label govuk-label--3" htmlFor="nhsNumber">
            NHS Number:
          </label>
          <input
            className="govuk-label"
            for="width-8"
            type="text"
            id="nhsNumber"
            value={NHSNumber}
            onChange={(event) => setNhsNumber(event.target.value)}
          />
          <button
            className="govuk-button"
            data-module="govuk-button"
            type="submit"
          >
            Search
          </button>
        </form>
        <table className="govuk-table">
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
                Date of Appointment
              </th>
              <th scope="col" className="govuk-table__header">
                Time of Appointment
              </th>
              <th scope="col" className="govuk-table__header">
                Appointment Notes
              </th>
              <th scope="col" className="govuk-table__header">
                Actions
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
                    onClick={() => handleDelete(appointment.appointmentNumber)}
                  >
                    Delete
                  </button>
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
