<?php
require_once '../db.php';
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Adjust this according to your deployment setup
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
function getAllPatients($conn) {
    $sql = "SELECT * FROM patients";
    $result = $conn->query($sql);

    $patients = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($patients, $row);
        }
    }

    return $patients;
}

function updatePatient($conn, $patientData) {
    $sql = "UPDATE patients SET
        Forename = ?,
        Surname = ?,
        PersonDOB = ?,
        GenderCode = ?,
        Postcode = ?
        WHERE NHSNumber = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "sssssi",
        $patientData["Forename"],
        $patientData["Surname"],
        $patientData["PersonDOB"],
        $patientData["GenderCode"],
        $patientData["Postcode"],
        $patientData["NHSNumber"]
    );

    return $stmt->execute();
}

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "GET") {
    $patients = getAllPatients($conn);
    echo json_encode($patients);
} elseif ($requestMethod === "POST") {
    $patientData = json_decode(file_get_contents("php://input"), true);
    $result = updatePatient($conn, $patientData);

    if ($result) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn->close();
?>
