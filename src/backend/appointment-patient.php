<?php

header("Access-Control-Allow-Origin: *"); //CORS header to enable any domain to send HTTP requests
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("HTTP/1.1 200 OK");
  exit;
}

try {
    $pdo = new PDO("sqlite:gpwebsite.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

$method = $_SERVER['REQUEST_METHOD'];
$result = NULL; // default value

switch ($method) {
  case 'GET':
    $accountNumber = $_GET['accountNumber'];

    // Get the NHSNumber of the patient
    $sql = "SELECT NHSNumber FROM Patient_Record WHERE accountNumber = :accountNumber";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':accountNumber', $accountNumber);
    $stmt->execute();
    $patientResult = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$patientResult) {
      http_response_code(404);
      die("Patient not found.");
    }

    $NHSNumber = $patientResult['NHSNumber'];

    // Get the appointments for the specific patient
    $sql = "SELECT
                A.appointmentNumber,
                A.dateOfAppointment,
                A.timeOfAppointment,
                P.forename || ' ' || P.surname AS patientName,
                D.firstName || ' ' || D.lastName AS doctorName
            FROM
                appointment A
            JOIN patient P ON
                A.NHSNumber = P.NHSNumber
            JOIN doctor D ON
                A.medicalLicenseNumber = D.medicalLicenseNumber
            WHERE
                A.NHSNumber = :NHSNumber";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':NHSNumber', $NHSNumber);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_OBJ);

    if (!$result) {
      $result = []; // Set an empty array
    }

    break;

  case 'DELETE':
    // parse_str(file_get_contents("php://input"), $params);
    // $appointmentNumber = isset($params['appointmentNumber']) ? $params['appointmentNumber'] : null;
    $appointmentNumber = isset($_GET['appointmentNumber']) ? $_GET['appointmentNumber'] : null;

    // Delete the appointment
    $sql = "DELETE FROM appointment WHERE appointmentNumber = :appointmentNumber";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':appointmentNumber', $appointmentNumber);
    $stmt->execute();

    break;
}

// die if SQL statement failed
if ($method == 'GET' && !$result) {
  $errorInfo = $stmt->errorInfo();
  $errorMessage = "SQL error: " . $errorInfo[2]; // Extract the error message from the error info array
  $errorResponse = array("error" => $errorMessage); // Create an associative array with the error message
  http_response_code(500); // Use an appropriate error status code, such as 500 for internal server error
  echo json_encode($errorResponse); // Convert the error response to JSON and echo it
  exit; // Terminate the script
} else if ($method == 'DELETE') {
  echo json_encode(array("success" => true)); // Return a success response
  exit; // Terminate the script
}

if ($method == 'GET') {
  header('Content-Type: application/json');
  echo json_encode($result);
} else {
  // Respond with success status code
  http_response_code(200);
}

?>