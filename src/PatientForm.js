import React, { useState } from 'react';

const PatientForm = ({ onSubmit }) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const nhsNumber = event.target['nhs-number'].value.trim();
    const forename = event.target.forename.value.trim();
    const surname = event.target.surname.value.trim();
    const dob = event.target.dob.value.trim();
    const gender = event.target.gender.value.trim();
    const postcode = event.target.postcode.value.trim();

    let newErrors = {};

    if (!nhsNumber) newErrors.nhsNumber = 'NHS Number is required.';
    if (!forename) newErrors.forename = 'Forename is required.';
    if (!surname) newErrors.surname = 'Surname is required.';
    if (!dob) newErrors.dob = 'Date of Birth is required.';
    if (!gender) newErrors.gender = 'Gender is required.';
    if (!postcode) newErrors.postcode = 'Postcode is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const patientData = {
      nhsNumber,
      forename,
      surname,
      dob,
      gender,
      postcode,
    };

    onSubmit(patientData);
  };

  const renderError = (field) => {
    return errors[field] ? <span className="govuk-error-message">{errors[field]}</span> : null;
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={`govuk-form-group ${errors.nhsNumber ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="nhs-number">
          NHS Number
        </label>
        {renderError('nhsNumber')}
        <input
          className={`govuk-input ${errors.nhsNumber ? 'govuk-input--error' : ''}`}
          id="nhs-number"
          name="nhs-number"
          type="number"
        />
      </div>

      <div className={`govuk-form-group ${errors.forename ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="forename">
          Forename
        </label>
        {renderError('forename')}
        <input
          className={`govuk-input ${errors.forename ? 'govuk-input--error' : ''}`}
          id="forename"
          name="forename"
          type="text"
        />
      </div>

      <div className={`govuk-form-group ${errors.surname ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="surname">
          Surname
        </label>
        {renderError('surname')}
        <input
          className={`govuk-input ${errors.surname ? 'govuk-input--error' : ''}`}
          id="surname"
          name="surname"
          type="text"
        />
      </div>

      <div className={`govuk-form-group ${errors.dob ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="dob">
          Date of Birth
        </label>
        {renderError('dob')}
        <input
          className={`govuk-input ${errors.dob ? 'govuk-input--error' : ''}`}
          id="dob"
        name="dob"
        type="date"
        />
    </div>
    <div className={`govuk-form-group ${errors.gender ? 'govuk-form-group--error' : ''}`}>
    <label className="govuk-label" htmlFor="gender">
      Gender
    </label>
    {renderError('gender')}
    <select
      className={`govuk-select ${errors.gender ? 'govuk-select--error' : ''}`}
      id="gender"
      name="gender"
    >
      <option value="">Select gender</option>
      <option value="M">Male</option>
      <option value="F">Female</option>
      <option value="O">Other</option>
    </select>
  </div>

  <div className={`govuk-form-group ${errors.postcode ? 'govuk-form-group--error' : ''}`}>
    <label className="govuk-label" htmlFor="postcode">
      Postcode
    </label>
    {renderError('postcode')}
    <input
      className={`govuk-input ${errors.postcode ? 'govuk-input--error' : ''}`}
      id="postcode"
      name="postcode"
      type="text"
    />
  </div>

  <button className="govuk-button" type="submit">
    Update Patient Record
  </button>
</form>
);
};

export default PatientForm;
         
