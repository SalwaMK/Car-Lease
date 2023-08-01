<?php
// Allow requests from specific origin (http://localhost:3000 in this case)
require_once('allow_origin.php');

if (empty($_GET["id"])) {
    http_response_code(404);
    exit;
}
$id = $_GET["id"];

$connection = new mysqli('localhost', 'root', '', 'car-lease');

$carsQuery = "SELECT * FROM car WHERE id = $id";
$carsResult = $connection->query($carsQuery);

$row = $carsResult->fetch_assoc();
$car = array(
    'id' => $row['id'],
    'marque' => $row['marque'],
    'modele' => $row['modele'],
    'immatriculation' => $row['immatriculation'],
    'agency' => $row['agency'],
    'image' => $row['image'],
);


// Return the combined data as JSON
header('Content-Type: application/json');
echo json_encode($car);


$connection->close();
