<?php

require '../models/Database.php';
require '../models/Agency.php';

header('Content-Type: application/json');

$aRepo = new Agency(Database::dbConnect());

if ($_GET['action'] == 'getAgencies') {
    $agencies = $aRepo->agencies();
    echo json_encode($agencies);
}

if ($_GET['action'] == 'upsertAgency') {
    $aRepo->upsert($_POST);
    echo json_encode('ok');
}