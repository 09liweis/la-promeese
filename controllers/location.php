<?php

require '../models/Database.php';
require '../models/Location.php';

header('Content-Type: application/json');

$locationRepo = new Location(Database::dbConnect());

if ($_GET['action'] == 'getRegions') {
    $regions = $locationRepo->regions();
    echo json_encode($regions);
}

if ($_GET['action'] == 'getProvinces') {
    $provinces = $locationRepo->provinces($_GET['id']);
    echo json_encode($provinces);
}