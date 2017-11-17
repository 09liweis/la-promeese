<?php

require '../models/Database.php';
require '../models/Progress.php';

header('Content-Type: application/json');

$pRepo = new Progress(Database::dbConnect());

if ($_GET['action'] == 'getProgresses') {
    $progresses = $pRepo->progresses($_GET['id']);
    echo json_encode($progresses);
}

if ($_GET['action'] == 'getAllProgresses') {
    $progresses = $pRepo->progresses();
    echo json_encode($progresses);
}

if ($_GET['action'] == 'getVisaImmiProgresses') {
    $progresses = $pRepo->getVisaImmiProgresses();
    echo json_encode($progresses);
}

if ($_GET['action'] == 'getSchoolProgresses') {
    $progresses = $pRepo->getSchoolProgresses();
    echo json_encode($progresses);
}