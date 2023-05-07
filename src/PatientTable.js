import React from 'react';

const PatientTable = ({ patients }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>NHS Number</th>
          <th>Forename</th>
          <th>Surname</th>
          <th>Date of Birth</th>
          <th>Gender</th>
          <th>Postcode</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.NHSNumber}>
            <td>{patient.NHSNumber}</td>
            <td>{patient.Forename}</td>
            <td>{patient.Surname}</td>
            <td>{patient.PersonDOB}</td>
            <td>{patient.GenderCode}</td>
            <td>{patient.Postcode}</td>
            </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientTable;
