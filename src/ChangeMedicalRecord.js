import React, { useState, useEffect } from 'react';
import PatientForm from './PatientForm';
import PatientTable from './PatientTable';
import "./styles.scss";
import 'govuk-frontend/govuk/all.scss';

const ChangeMedicalRecord = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const response = await fetch('http://localhost/patient-backend/patient.php');
    const data = await response.json();
    setPatients(data);
  };

  // Function to handle form submission and update patient record
  const handleFormSubmit = async (patientData) => {

    const response = await fetch('http://localhost/patient-backend/patient.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData),
    });

    if (response.ok) {
      fetchPatients();
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">Change Patient Records</h1>
        <PatientForm onSubmit={handleFormSubmit} />
        
      </main>
    </div>
  );
};

export default ChangeMedicalRecord;
