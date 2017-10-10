<?php

require '../models/Database.php';
require '../models/Business.php';

header('Content-Type: application/json');

$bRepo = new Business(Database::dbConnect());

if ($_GET['action'] == 'getBusinesses') {
    $businesses = $bRepo->businesses($_GET['id']);
    echo json_encode($businesses);
}

if ($_GET['action'] == 'upsertBusiness') {
    $bRepo->upsert($_POST);
    echo json_encode('ok');
}