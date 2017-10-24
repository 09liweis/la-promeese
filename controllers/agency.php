<?php

require '../models/Database.php';
require '../models/Agency.php';

header('Content-Type: application/json');

$aRepo = new Agency(Database::dbConnect());

if ($_GET['action'] == 'getAgencies') {
    $agencies = $aRepo->agencies();
    echo json_encode($agencies);
}