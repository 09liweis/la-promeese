<?php

require '../models/Database.php';
require '../models/Office.php';

header('Content-Type: application/json');

$oRepo = new Office(Database::dbConnect());

if ($_GET['action'] == 'getOffices') {
    $offices = $oRepo->offices($_GET['id']);
    echo json_encode($offices);
}

if ($_GET['action'] == 'upsertOffice') {
    $oRepo->upsert($_POST);
    echo json_encode('ok');
}

if ($_GET['action'] == 'removeOffice') {
    $oRepo->remove($_POST['id']);
    echo json_encode('ok');
}