<?php

header("Access-Control-Allow-Origin: *"); //CORS header
header("Access-Control-Allow-Methods: GET, POST, DELETE");

try {
    $pdo = new PDO("sqlite:gpwebsite.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $sql = "SELECT
          A.appointmentNumber,
          A.NHSNumber,
          A.medicalLicenseNumber,
          A.dateOfAppointment,
          A.timeOfAppointment,
          A.appointmentNotes
      FROM
          appointment A
      JOIN patient P ON
          A.NHSNumber = P.NHSNumber
      JOIN doctor D ON
          A.medicalLicenseNumber = D.medicalLicenseNumber";
        break;
    case 'DELETE':
        $appointmentNumber = isset($_GET['appointmentNumber']) ? $_GET['appointmentNumber'] : null;

        if ($appointmentNumber) {
            $sql = "DELETE FROM Appointment WHERE appointmentNumber = :appointmentNumber";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':appointmentNumber', $appointmentNumber);

            try {
                $stmt->execute();
                echo $stmt->rowCount();
            } catch (PDOException $e) {
                http_response_code(404);
                die($e->getMessage());
            }
        } else {
            http_response_code(400);
            die("Invalid appointment number.");
        }

        break;
}

try {
    // Prepare and execute SQL statement
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    if ($method == 'GET') {
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
    } else {
        echo $stmt->rowCount();
    }
} catch (PDOException $e) {
    http_response_code(404);
    die($e->getMessage());
}

$pdo = null;

?>
