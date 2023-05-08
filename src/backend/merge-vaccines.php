<?php

// Author: Rishab, Charlotte, Craig

try {
    // Connect to the global database (vaccines.db)
    $globalPDO = new PDO("sqlite:vaccines.db");
    $globalPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Connect to the local database (gpwebsite.db)
    $localPDO = new PDO("sqlite:gpwebsite.db");
    $localPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retrieve NHSNumbers and DoseNos from the local database
    $localQuery = "SELECT NHSNumber, DoseNo FROM Vaccines";
    $localStmt = $localPDO->query($localQuery);
    $localKeys = $localStmt->fetchAll(PDO::FETCH_ASSOC);

    // Retrieve all rows from the global database
    $globalQuery = "SELECT * FROM vaccines WHERE NHSNumber IS NOT NULL";
    $globalStmt = $globalPDO->query($globalQuery);
    $data = $globalStmt->fetchAll(PDO::FETCH_ASSOC);

    // Insert new entries into the local database
    $localPDO->beginTransaction();
    $insertQuery = "INSERT INTO Vaccines (NHSNumber, DoseNo, vaccinationDate, vaccineManufacture, diseaseTargeted, vaccineType, product, vaccineBatchNumber, countryOfVaccination, authority, site, totalSeriesOfDoses, displayName, snomedCode, dateEntered, procedureCode, booster) 
                    VALUES (:NHSNumber, :DoseNo, :vaccinationDate, :vaccineManufacture, :diseaseTargeted, :vaccineType, :product, :vaccineBatchNumber, :countryOfVaccination, :authority, :site, :totalSeriesOfDoses, :displayName, :snomedCode, :dateEntered, :procedureCode, :booster)";
    $insertStmt = $localPDO->prepare($insertQuery);

    foreach ($data as $row) {
        $exists = false;
        foreach ($localKeys as $key) {
            if ($key['NHSNumber'] == $row['NHSNumber'] && $key['DoseNo'] == $row['DoseNo']) {
                $exists = true;
                break;
            }
        }
    
        if (!$exists) {
            $insertStmt->bindValue(':NHSNumber', $row['NHSNumber']);
            $insertStmt->bindValue(':DoseNo', $row['DoseNo']);
            $insertStmt->bindValue(':vaccinationDate', $row['VaccinationDate']);
            $insertStmt->bindValue(':vaccineManufacture', $row['VaccineManufacturer']);
            $insertStmt->bindValue(':diseaseTargeted', $row['DiseaseTargeted']);
            $insertStmt->bindValue(':vaccineType', $row['VaccineType']);
            $insertStmt->bindValue(':product', $row['Product']);
            $insertStmt->bindValue(':vaccineBatchNumber', $row['VaccineBatchNumber']);
            $insertStmt->bindValue(':countryOfVaccination', $row['CountryOfVaccination']);
            $insertStmt->bindValue(':authority', $row['Authority']);
            $insertStmt->bindValue(':site', $row['Site']);
            $insertStmt->bindValue(':totalSeriesOfDoses', $row['TotalSeriesOfDoses']);
            $insertStmt->bindValue(':displayName', $row['DisplayName']);
            $insertStmt->bindValue(':snomedCode', $row['SnomedCode']);
            $insertStmt->bindValue(':dateEntered', $row['DateEntered']);
            $insertStmt->bindValue(':procedureCode', $row['ProcedureCode']);
            $insertStmt->bindValue(':booster', $row['Booster']);
            $insertStmt->execute();
        }
    }

    $localPDO->commit();

    echo "Data transferred successfully!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

?>
