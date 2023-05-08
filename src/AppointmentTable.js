import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const AppointmentTable = () => {
  const { NHSNumber } = useContext(UserContext);
  const [Appointment, setAppointments] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:4000/gpsurgery/patientmedicalrecords.php?accountNumber=${NHSNumber}`
    )

    fetch("http://localhost:4000/backend/appointment-patient.php")
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
  }, [NHSNumber]);

  const handleDelete = (id) => {
    fetch(`/api/appointments/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setAppointments(
          Appointment.filter((appointment) => appointment.id !== id)
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
        {Appointment.map((Appointment) => (
          <tr className="govuk-table__row" key={Appointment.id}>
            <td className="govuk-table__cell">
              {Appointment.dateOfAppointment}
            </td>
            <td className="govuk-table__cell">
              {Appointment.timeOfAppointment}
            </td>
            <td className="govuk-table__cell">{Appointment.patientName}</td>
            <td className="govuk-table__cell">{Appointment.doctorName}</td>
            <td className="govuk-table__cell">
              <button
                className="govuk-button govuk-button--warning"
                data-module="govuk-button"
                onClick={() => handleDelete(Appointment.id)}
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
