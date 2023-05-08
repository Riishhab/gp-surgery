import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";

const MedicalRecords = () => {
  const { accountNumber } = useContext(UserContext);
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:4000/backend/medical-records-patient.php?accountNumber=${accountNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setMedicalRecords(data);
        } else {
          setMedicalRecords([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching medical records:", error);
      });
  }, [accountNumber]);

  return (
    <div>
      {medicalRecords.length > 0 ? (
        <table className="govuk-table">
          <caption className="govuk-table__caption govuk-table__caption--m">
            Medical Records
          </caption>
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              <th scope="col" className="govuk-table__header">
                Confidential Data
              </th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            {medicalRecords.map((record, index) => (
              <tr className="govuk-table__row" key={index}>
                <td className="govuk-table__cell">{record.medicalRecords}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No medical records found for this account.</p>
      )}
    </div>
  );
};

export default MedicalRecords;
