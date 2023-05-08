<?php

if(isset($_POST['date']) && $_POST['time']!="null"){

header('Access-Control-Allow-Origin: *');

$date = $_POST['date'];
$time = $_POST['time'];
$notes = $_POST['notes'];


$pdo = new \PDO("sqlite:gpwebsite.db");

// Query the Doctors table to find an available doctor
$sql = "SELECT medicalLicenseNumber FROM Doctor WHERE medicalLicenseNumber NOT IN (SELECT medicalLicenseNumber FROM Appointment WHERE dateOfAppointment = ? AND timeOfAppointment = ?) ORDER BY RANDOM()";
$stmt = $pdo->prepare($sql);
$stmt->execute([$date, $time]);
$row = $stmt->fetch();

if (!$row) {
    // There are no available doctors at the requested time and date
    header("HTTP/1.1 400 Bad Request");
} else {
    // Assign the doctor to the new appointment
    $doctor_id = $row['medicalLicenseNumber'];
    $sql = "INSERT INTO Appointment (NHSNumber,medicalLicenseNumber, dateOfAppointment, timeOfAppointment, appointmentNotes) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([123, $doctor_id, $date, $time, $notes]);
}
}
else{
    header("HTTP/1.1 400 Bad Request");
}
?>