<?php

require '../models/Database.php';
require '../models/SchoolApplication.php';

header('Content-Type: application/json');

$sRepo = new SchoolApplication(Database::dbConnect());

if ($_GET['action'] == 'getApplications') {
    $applications = $sRepo->applications($_GET['id']);
    echo json_encode($applications);
}

if ($_GET['action'] == 'upsertApplication') {
    $sRepo->upsert($_POST);
    echo json_encode('ok');
}