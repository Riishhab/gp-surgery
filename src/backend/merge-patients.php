<?php
try {
    // Connect to the global database (vaccines.db)
    $globalPDO = new PDO("sqlite:vaccines.db");
    $globalPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Connect to the local database (gpwebsite.db)
    $localPDO = new PDO("sqlite:gpwebsite.db");
    $localPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retrieve NHSNumbers from the local database
    $localQuery = "SELECT NHSNumber FROM Patient";
    $localStmt = $localPDO->query($localQuery);
    $localNHSNumbers = $localStmt->fetchAll(PDO::FETCH_COLUMN);

    // Retrieve new entries from the global database
    $globalQuery = "SELECT * FROM patients WHERE NHSNumber NOT IN (" . implode(",", $localNHSNumbers) . ")";
    $globalStmt = $globalPDO->query($globalQuery);
    $data = $globalStmt->fetchAll(PDO::FETCH_ASSOC);

    // Insert new entries into the local database
    $localPDO->beginTransaction();
    $insertQuery = "INSERT INTO Patient (NHSNumber, forename, surname, personDOB, genderCode, postcode) 
                    VALUES (:NHSNumber, :forename, :surname, :personDOB, :genderCode, :postcode)";
    $insertStmt = $localPDO->prepare($insertQuery);

    foreach ($data as $row) {
        $insertStmt->bindValue(':NHSNumber', $row['NHSNumber']);
        $insertStmt->bindValue(':forename', $row['Forename']);
        $insertStmt->bindValue(':surname', $row['Surname']);
        $insertStmt->bindValue(':personDOB', $row['PersonDOB']);
        $insertStmt->bindValue(':genderCode', $row['GenderCode']);
        $insertStmt->bindValue(':postcode', $row['Postcode']);
        $insertStmt->execute();
    }

    $localPDO->commit();
    
    echo "Data transferred successfully!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
