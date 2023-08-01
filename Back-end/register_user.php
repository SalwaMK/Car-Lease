<?php

require_once('allow_origin.php');


if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the JSON data sent from the React front-end
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate the data (add more validation as needed)
    if (empty($data["username"]) || empty($data["email"]) || empty($data["password"]) || empty($data["phone"]) || empty($data["country"])) {
        http_response_code(400);
        echo json_encode(array("error" => "All data is required."));
        exit();
    }

    // Sanitize the data before inserting into the database (optional but recommended)
    $name = filter_var($data["username"], FILTER_SANITIZE_STRING);
    $email = filter_var($data["email"], FILTER_SANITIZE_EMAIL);
    $password = filter_var($data["password"], FILTER_SANITIZE_STRING);
    $phone = filter_var($data["phone"], FILTER_SANITIZE_STRING);
    $country = filter_var($data["country"], FILTER_SANITIZE_STRING);

    // Create a new timestamp for the 'created_at' field
    //$created_at = date("Y-m-d H:i:s");

    // Connect to the database (replace 'your_username', 'your_password', and 'your_db_name' with your actual credentials)
    $conn = new mysqli("localhost", "root", "", "car-lease");

    // Check for a successful connection
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(array("error" => "Failed to connect to the database."));
        exit();
    }

    // Prepare the INSERT query with placeholders to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO users (username, email, pass, phone, country) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $password, $phone, $country);

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(array(
            "message" => "Registration successful.",
            "user" => array(
                "username" => $name,
                "email" => $email,
            )
        ));
        http_response_code(201);
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Failed to register the person."));
    }

    // Close the prepared statement and database connection
    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(array("error" => "Method Not Allowed"));
}
