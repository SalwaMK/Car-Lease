<?php
$allowedOrigin = 'http://localhost:3000';

// Check if the request is from an allowed origin
if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowedOrigin) {
    // Allow specific origin
    header('Access-Control-Allow-Origin: ' . $allowedOrigin);
    // Allow specific HTTP methods
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    // Allow specific HTTP headers
    header('Access-Control-Allow-Headers: Content-Type');
    // Allow credentials (cookies, HTTP authentication)
    header('Access-Control-Allow-Credentials: true');
}
