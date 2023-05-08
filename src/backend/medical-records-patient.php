<?php

// Author: Rishab, Charlotte, Craig

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

try {
    // PDO instance
    $pdo = new \PDO("sqlite:gpwebsite.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $accountNumber = $_GET['accountNumber'];

    // SQL query
    $sql = "SELECT medicalRecords FROM patient_record WHERE accountNumber = :accountNumber";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':accountNumber', $accountNumber);

    // Execute the query
    if ($stmt->execute()) {
        // Fetch all the rows as an associative array
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Convert the data to JSON format
        $json = json_encode($rows);

        // Content type header to application/json
        header('Content-Type: application/json');

        // Output the JSON data
        echo $json;
    } else {
        // Handle the error case
        echo json_encode(['error' => 'Failed to fetch medical records']);
    }
} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}

?>
