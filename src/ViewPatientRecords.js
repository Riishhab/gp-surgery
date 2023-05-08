import React, { useState, useEffect } from 'react';
import PatientTable from './PatientTable';
import "./styles.scss";
import 'govuk-frontend/govuk/all.scss';

const ViewPatientRecords = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const response = await fetch('http://localhost/patient-backend/patient.php');
    const data = await response.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">View Patient Records</h1>
        <PatientTable patients={patients} />
      </main>
    </div>
  );
};

export default ViewPatientRecords;
