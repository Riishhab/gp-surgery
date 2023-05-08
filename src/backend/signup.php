<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // CORS header to enable any domain to send HTTP requests
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection details
$dbPath = "gpwebsite.db";

// Create connection
try {
    $conn = new \PDO("sqlite:$dbPath");
    $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
} catch (\PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $username = $data["username"];
    $hash = $data["hash"];
    $userType = $data["userType"];

    $userNameCheck = "SELECT * FROM login_credential WHERE username = :username";
    $stmt = $conn->prepare($userNameCheck);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
  
    if($stmt->rowCount() == 0){
        $sql = "INSERT INTO login_credential (username, HASH, userType) VALUES (:username, :hash, :userType)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':hash', $hash);
        $stmt->bindParam(':userType', $userType);
        
        if ($stmt->execute()) {
            $status = "success";
            $message = "Account created successfully.";
        } else {
            // Other database error
            $status = "error";
            $message = "Error: " . $stmt->errorInfo();
        }
    } else {
        // Duplicate entry error
        $status = "error";
        $message = "Please enter a different username";
    }

    $response[] = array("status" => $status, "message" => $message);
    echo json_encode($response);
}

$conn = null;

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
  $userType = $data["userType"];

  $userNameCheck = "SELECT * FROM login_credential WHERE username = '$username'";
  
  $check = mysqli_query($conn, $userNameCheck);
  
  if(mysqli_num_rows($check) == 0){

    $sql = "INSERT INTO login_credential (username, HASH, userType) VALUES ('$username', '$hash', '$userType')";

    if ($conn->query($sql) === TRUE) {
      $status = "success";
      $message = "Account created successfully.";
    } else {
        // Other database error
        $status = "error";
        $message = "Error: " . $conn->error;
      } 
    }
  else {
    // Duplicate entry error
    $status = "error";
    $message = "Please enter a different username";
  }

  $response[] = array("status" => $status, "message" => $message);
  echo json_encode($response);
}

$conn->close();
*/
?>