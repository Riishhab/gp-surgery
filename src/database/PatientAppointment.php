<?php
header("Access-Control-Allow-Origin: *"); //CORS header to enable any domain to send HTTP requests
$host = "localhost";
$user = "root";
$password = "";
$dbname = "gpsurgery";
$id = '';

$con = mysqli_connect($host, $user, $password, $dbname);

$method = $_SERVER['REQUEST_METHOD'];


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
  case 'GET':
    $nhsNumber = mysqli_real_escape_string($con, $_GET['NHSNumber']);
    $sql = "SELECT
              A.dateOfAppointment,
              A.timeOfAppointment,
              CONCAT(P.forename, ' ', P.surname) AS patientName,
              CONCAT(D.firstName, ' ', D.lastName) AS doctorName
            FROM
              appointment A
              JOIN patient P ON A.NHSNumber = P.NHSNumber
              JOIN doctor D ON A.medicalLicenseNumber = D.medicalLicenseNumber
            WHERE
              A.NHSNumber = '$NHSNumber'";
    break;
}

// run SQL statement
$result = mysqli_query($con, $sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($method == 'GET') {
  // If no NHS number is provided, wrap the response in an array
  if (!$nhsNumber)
    echo '[';

  // Loop through the results and return a JSON object for each appointment
  for ($i = 0; $i < mysqli_num_rows($result); $i++) {
    $row = mysqli_fetch_assoc($result);
    echo ($i > 0 ? ',' : '') . json_encode([
      'dateOfAppointment' => $row['dateOfAppointment'],
      'timeOfAppointment' => $row['timeOfAppointment'],
      'NHSNumber' => $row['NHSNumber'],
      'medicalLicenseNumber' => $row['medicalLicenseNumber']
    ]);
  }

  // Close the array if no NHS number is provided
  if (!$nhsNumber)
    echo ']';
} else {
  echo mysqli_affected_rows($con);
}

$con->close();