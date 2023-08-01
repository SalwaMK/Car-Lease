<?php

require_once('allow_origin.php');

// Step 1: Retrieve the email and immatriculation from the incoming request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data["email"];
    $car_id = $data["car_id"];
    $duration = $data["duration"];
    $start_date = $data["start_date"];

    $conn = new mysqli('localhost', 'root', '', 'car-lease');

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // !creating the necessary data for the reservation
    $cost = 15 * $duration;
    $finished  = "false";


    $stmt = $conn->prepare("INSERT INTO reservation (email, date_start, duration, cost, finished, car) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $email, $start_date, $duration, $cost, $finished, $car_id);

    if (!$stmt->execute()) {
        http_response_code(500);
        echo json_encode(array("error" => "Failed to register the person."));
    }

    $stmt = $conn->prepare("UPDATE car SET isOccupied='true' WHERE id=?");
    $stmt->bind_param("s", $car_id);

    // Execute the query
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(array(
            "message" => "Reservation created.",
        ));
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Failed to register the person."));
    }


    // Close the statement and the database connection
    $stmt->close();
    $conn->close();
} else {
    echo "Invalid email or immatriculation.";
}
