<?php

header('Access-Control-Allow-Origin: *');

$date = $_POST['date'];
$time = $_POST['time'];
$notes = $_POST['notes'];

$pdo = new \PDO("sqlite:gpwebsite.db");

$sql = "INSERT INTO Appointment (appointmentNumber,NHSNumber,medicalLicenseNumber,dateOfAppointment,timeOfAppointment,appointmentNotes) VALUES (1234,1234,1234,'$date','$time','$notes')";

$stmt = $pdo->prepare($sql);
$stmt->execute();


?>