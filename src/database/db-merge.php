<?php
// Database credentials for source database
$sourceHost = 'source_host';
$sourceDB = 'source_database';
$sourceUser = 'source_user';
$sourcePassword = 'source_password';

// Database credentials for destination database
$destinationHost = 'destination_host';
$destinationDB = 'destination_database';
$destinationUser = 'destination_user';
$destinationPassword = 'destination_password';

try {
    // Connect to source database
    $sourcePDO = new PDO("mysql:host=$sourceHost;dbname=$sourceDB", $sourceUser, $sourcePassword);
    
    // Connect to destination database
    $destinationPDO = new PDO("mysql:host=$destinationHost;dbname=$destinationDB", $destinationUser, $destinationPassword);

    // Retrieve data from source database
    $query = "SELECT * FROM source_table";
    $stmt = $sourcePDO->query($query);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Store data in destination database
    foreach ($data as $row) {
        $destinationPDO->beginTransaction();
        
        $insertQuery = "INSERT INTO destination_table (column1, column2, column3) VALUES (:value1, :value2, :value3)";
        $insertStmt = $destinationPDO->prepare($insertQuery);
        $insertStmt->bindParam(':value1', $row['column1']);
        $insertStmt->bindParam(':value2', $row['column2']);
        $insertStmt->bindParam(':value3', $row['column3']);
        $insertStmt->execute();
        
        $destinationPDO->commit();
    }
    
    echo "Data transferred successfully!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
