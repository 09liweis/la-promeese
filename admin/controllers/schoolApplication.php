<?php

require '../models/Database.php';
require '../models/SchoolApplication.php';
require '../models/Student.php';

header('Content-Type: application/json');

$sRepo = new SchoolApplication(Database::dbConnect());

if ($_GET['action'] == 'getApplications') {
    $applications = $sRepo->applications($_GET['id']);
    foreach ($applications as &$application) {
        $schoolApps = $sRepo->getSchoolApplications($application['id']);
        $application['schools'] = $schoolApps;
    }
    echo json_encode($applications);
}

if ($_GET['action'] == 'upsertApplication') {
    $schools = json_decode($_POST['schools'], true);
    unset($_POST['schools']);
    $sRepo->upsert($_POST, $schools);
    $sRepo = new Student(Database::dbConnect());
    $sRepo->updateStudent($_POST);
    echo json_encode('ok');
}

if ($_GET['action'] == 'removeSchoolApplication') {
    $sRepo->remove($_POST['id']);
    echo json_encode('ok');
}