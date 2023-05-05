<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); //CORS header to enable any domain to send HTTP requests
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gpsurgery";
// $id = '';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = json_decode(file_get_contents("php://input"), true);

  $username = $data["username"];
  $password = $data["password"];
  $confirmPassword = $data["confirmPassword"];
  // $userType = $data["userType"];
  $userType = "patient";

  // Now you can do something with the data, like saving it to a database

  // Return a response to the client
  $response = array("status" => "success");
  header("Content-Type: application/json");
  echo json_encode($response);
}





print_r($data);
/*
// Get form data
$username = $_POST['username'];
$password = $_POST['password'];
$confirmPassword = $_POST['confirmPassword'];
$userType = $_POST['userType'];

// Validate form data
if(empty($username) || empty($password) || empty($confirmPassword) || empty($userType)) {
  echo json_encode(array("status" => "error", "message" => "Please fill in all fields."));
  exit();
}

if(strlen($username) > 15) {
  echo json_encode(array("status" => "error", "message" => "Username should be less than or equal to 15 characters."));
  exit();
}

if(strlen($password) < 8 || strlen($password) > 16) {
  echo json_encode(array("status" => "error", "message" => "Password should be between 8 to 16 characters."));
  exit();
}

if(!preg_match('/[#\$\._!@&]/', $password)) {
  echo json_encode(array("status" => "error", "message" => "Password should contain at least one special character (# $ . _ ! @ &)."));
  exit();
}

if($password != $confirmPassword) {
  echo json_encode(array("status" => "error", "message" => "Passwords do not match."));
  exit();
}
*/
// Insert data into database
$sql = "INSERT INTO login_credential (username, HASH, userType) VALUES ('$username', '$password', '$userType')";

if ($conn->query($sql) === TRUE) {
  echo json_encode(array("status" => "success", "message" => "Account created successfully."));
} else {
  echo json_encode(array("status" => "error", "message" => "Error: " . $sql . $conn->error));
}

$conn->close();
?>