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
    $hash = $data["hash"];
    $storedHash = "";
    $accountNumber = "";
    $userType = "";

    $userNameCheck = "SELECT * FROM Login_Credential WHERE username = ?";
    $stmt = $conn->prepare($userNameCheck);
    // $stmt->bindParam(':username', $username);
    $stmt->execute([$username]);
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


/*
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); //CORS header to enable any domain to send HTTP requests
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gpsurgery";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = json_decode(file_get_contents("php://input"), true);

  $username = $data["username"];
  $hash = $data["hash"];
  $accountNumber = "";
  $userType = "";

  $userNameCheck = "SELECT * FROM login_credential WHERE username = '$username'";
  
  $check = mysqli_query($conn, $userNameCheck);
  
  if(mysqli_num_rows($check) != 0){
    $row = mysqli_fetch_assoc($check);
    $status = "success";
    $storedHash = $row["hash"];
    $accountNumber = $row["accountNumber"];
    $userType = $row["userType"]; 
    }
  else {
    $status = "error";
  }

  $response[] = array("status" => $status, "storedHash" => $storedHash, "accountNumber" => $accountNumber, "userType" => $userType);
  echo json_encode($response);
}

$conn->close();
*/
?>