<?php

require_once('allow_origin.php');


// Check if the request method is OPTIONS and exit early if it is
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$connection = new mysqli('localhost', 'root', '', 'car-lease');


// Assume you have already connected to the database

// Check if the user is authenticated and retrieve the user ID from the session
// This step depends on how you implement authentication in your project
// For example, you can use PHP sessions or JWT tokens for authentication

if (empty($_GET["email"])) {
    http_response_code(400);
    exit;
}
$user_email = $_GET["email"]; // Replace this with your actual code to get the authenticated user's ID

// Query to fetch user data from the user table
$userQuery = "SELECT * FROM users WHERE email = '$user_email'";
$userResult = mysqli_query($connection, $userQuery);

if (!$userResult) {
    die("User data retrieval failed: " . mysqli_error($connection));
}

$user = mysqli_fetch_assoc($userResult);
$userData = array(
    'username' => $user['username'],
    'email' => $user['email'],
    'phone' => $user['phone'],
    'country' => $user['country'],
);

// Query to fetch user bookings from the reservation table
$bookingQuery = "SELECT *, reservation.id AS reservation_id FROM reservation INNER JOIN car ON reservation.car = car.id WHERE email ='{$userData['email']}' AND finished='false'";
$bookingResult = mysqli_query($connection, $bookingQuery);

$oldBookingQuery = "SELECT *, reservation.id AS reservation_id FROM reservation INNER JOIN car ON reservation.car = car.id WHERE email= '{$userData['email']}' AND finished='true'";
$oldBookingResult = mysqli_query($connection, $oldBookingQuery);


if (!$bookingResult || !$oldBookingResult) {
    die("Booking data retrieval failed: " . mysqli_error($connection));
}

$bookings = array();
while ($row = mysqli_fetch_assoc($bookingResult)) {
    $bookings[] = $row;
}
$oldBookings = array();
while ($row = mysqli_fetch_assoc($oldBookingResult)) {
    $oldBookings[] = $row;
}

// Combine user data and bookings into a single array
$responseData = array(
    'userData' => $userData,
    'bookings' => $bookings,
    'oldBookings' => $oldBookings,
);



// Return the combined data as JSON
header('Content-Type: application/json');
echo json_encode($responseData);
