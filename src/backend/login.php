<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); //CORS header to enable any domain to send HTTP requests
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

try {
  // Create a new PDO instance
  $conn = new \PDO("sqlite:gpwebsite.db");

  // Set PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $username = $data["username"];
    $storedHash = "";
    $accountNumber = "";
    $userType = "";

    $userNameCheck = "SELECT * FROM Login_Credential WHERE username = :username";
    $stmt = $conn->prepare($userNameCheck);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $row = $stmt->fetch();

    if ($row) {
      $status = "success";
      $storedHash = $row["hash"];
      $accountNumber = $row["accountNumber"];
      $userType = $row["userType"];
    } else {
      $status = "error";
    }

    $response[] = array("status" => $status, "storedHash" => $storedHash, "accountNumber" => $accountNumber, "userType" => $userType);
    echo json_encode($response);
  }
} catch (PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

?>