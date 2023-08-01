<?php

require_once('allow_origin.php');



$connection = new mysqli('localhost', 'root', '', 'car-lease');

$carsQuery = "SELECT * FROM car WHERE isOccupied='false'";
$carsResult = $connection->query($carsQuery);

$cars = array();

while ($row = $carsResult->fetch_assoc()) {
    $car = array(
        'id' => $row['id'],
        'marque' => $row['marque'],
        'modele' => $row['modele'],
        'immatriculation' => $row['immatriculation'],
        'agency' => $row['agency'],
        'image' => $row['image'],
    );
    $cars[] = $car;
}


// Return the combined data as JSON
header('Content-Type: application/json');
echo json_encode($cars);


$connection->close();
