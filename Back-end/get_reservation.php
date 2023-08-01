<?php

require_once('allow_origin.php');


// Check if the request method is OPTIONS and exit early if it is
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if (empty($_GET["id"])) {
    http_response_code(404);
    exit;
}
$id = $_GET["id"];


$connection = new mysqli('localhost', 'root', '', 'car-lease');

// Query to fetch user bookings from the reservation table
$bookingQuery = "SELECT *, reservation.id AS reservation_id FROM reservation INNER JOIN car ON reservation.car = car.id WHERE reservation.id =$id";
$bookingResult = mysqli_query($connection, $bookingQuery);



if (!$bookingResult) {
    die("Booking data retrieval failed: " . mysqli_error($connection));
}

$bookings = array();
while ($row = mysqli_fetch_assoc($bookingResult)) {
    $bookings[] = $row;
}

if (empty($bookings)) {
    http_response_code(404);
    exit;
}

// Combine user data and bookings into a single array
$responseData = array(
    'bookings' => $bookings,
);



// Return the combined data as JSON
header('Content-Type: application/json');
echo json_encode($responseData);
