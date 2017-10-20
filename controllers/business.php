<?php

require '../models/Database.php';
require '../models/Business.php';
require '../models/Student.php';

header('Content-Type: application/json');

$bRepo = new Business(Database::dbConnect());

if ($_GET['action'] == 'getBusinesses') {
    $businesses = $bRepo->businesses($_GET['id']);
    echo json_encode($businesses);
}

if ($_GET['action'] == 'upsertBusiness') {
    $bRepo->upsert($_POST);
    $sRepo = new Student(Database::dbConnect());
    $sRepo->updateStudent($_POST);
    echo json_encode('ok');
}

if ($_GET['action'] == 'removeBusiness') {
    $bRepo->remove($_POST['id']);
    echo json_encode('ok');
}