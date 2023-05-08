<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

try {

  $pdo = new \PDO("sqlite:gpwebsite.db");
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


  $NHSNumber = $_GET['NHSNumber'];


  // Prepare the SQL query
  $sql = "SELECT appointmentNumber, NHSNumber, medicalLicenseNumber, dateOfAppointment, timeOfAppointment, appointmentNotes FROM Appointment WHERE NHSNumber = '$NHSNumber'";
  $stmt = $pdo->prepare($sql);

  // Execute the query
  if ($stmt->execute()) {
    // Fetch all the rows as an associative array
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convert the data to JSON format
    $json = json_encode($rows);

    // Set the content type header to application/json
    header('Content-Type: application/json');

    // Output the JSON data
    echo $json;
  } else {

    echo json_encode(['error' => 'Failed to fetch appointment details']);
  }
} catch (PDOException $e) {
  echo 'Error: ' . $e->getMessage();
}

?>