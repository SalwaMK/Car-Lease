<?php

require_once('allow_origin.php');


$connection = new mysqli('localhost', 'root', '', 'car-lease');


$booking_id = $_GET["booking_id"];
$immatriculation = $_GET["immat"];

$carQuery = "UPDATE car SET isOccupied='false' WHERE immatriculation='$immatriculation'";
$carResult = $connection->query($carQuery);

$reservationQuery = "UPDATE reservation SET finished='true' WHERE id='$booking_id'";
$reservationResult = $connection->query($reservationQuery);


echo json_encode(["success" => true]);


$connection->close();
