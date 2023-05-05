<?php
header("Access-Control-Allow-Origin: *"); //CORS header to enable any domain to send HTTP requests
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "gpsurgery"; 
$id = '';
 
$con = mysqli_connect($host, $user, $password,$dbname);
 
$method = $_SERVER['REQUEST_METHOD'];
 
 
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
    case 'GET':
      $sql = "SELECT
      A.dateOfAppointment,
      A.timeOfAppointment,
      CONCAT(P.forename, ' ', P.surname) AS patientName,
      CONCAT(D.firstName, ' ', D.lastName) AS doctorName
  FROM
      appointment A
  JOIN patient P ON
      A.NHSNumber = P.NHSNumber
  JOIN doctor D ON
      A.medicalLicenseNumber = D.medicalLicenseNumber"; 
      break;
}

// run SQL statement
$result = mysqli_query($con,$sql);
 
// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
 
if ($method == 'GET') {
    if (!$id) echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
}else {
    echo mysqli_affected_rows($con);
}
 
$con->close();

