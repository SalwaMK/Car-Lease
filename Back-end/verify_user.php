<?php


require_once('allow_origin.php');

error_reporting(E_ALL);
ini_set('display_errors', 1);

file_put_contents("debug.log", file_get_contents("php://input")); // Add this line to log the raw request data



// Get the POST data from the front-end
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['pass'] ?? '';

// Validate the input (you can add more validation here)
if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Please provide both email and password.']);
    exit;
}

// Replace "your_mysql_host", "your_mysql_username", "your_mysql_password", and "your_database_name" with your database credentials
$mysqli = new mysqli('localhost', 'root', '', 'car-lease');

// Check for database connection errors
if ($mysqli->connect_errno) {
    echo json_encode(['success' => false, 'message' => 'Failed to connect to the database.']);
    exit;
}

// Sanitize the input to prevent SQL injection (you can use prepared statements for better security)
$email = $mysqli->real_escape_string($email);
$password = $mysqli->real_escape_string($password);

// Query the database to find the user by email
$query = "SELECT * FROM users WHERE email='$email'";
$result = $mysqli->query($query);

// Check for database query errors
if (!$result) {
    echo json_encode(['success' => false, 'message' => 'Database query failed: ' . $mysqli->error]);
    exit;
}

// Check if the user exists and if the provided password matches the hashed password in the database
if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (strcmp($password, $user['pass']) === 0) { // Make sure the column name is 'pass' instead of 'password'
        echo json_encode([
            'success' => true,
            'message' => 'Login successful!',
            "user" => [
                "username" => $user["username"],
                "email" => $user["email"]
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Incorrect password.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'User not found.']);
}

$mysqli->close();

// Log the raw request data to 'debug.log' for debugging purposes
file_put_contents("debug.log", file_get_contents("php://input"));
