<?php

require '../models/Database.php';
require '../models/Performance.php';
require '../models/Student.php';

header('Content-Type: application/json');

$pRepo = new Performance(Database::dbConnect());

if ($_GET['action'] == 'getPerformances') {
    $performances = $pRepo->performances($_GET['id']);
    foreach ($performances as &$p) {
        $p['semesters'] = $pRepo->semesters($p['id']);
    }
    echo json_encode($performances);
}

if ($_GET['action'] == 'upsertPerformance') {
    $pRepo->upsert($_POST);
    $sRepo = new Student(Database::dbConnect());
    $sRepo->updateStudent($_POST);
    echo json_encode('ok');
}

if ($_GET['action'] == 'removePerformance') {
    $pRepo->remove($_POST['id']);
    echo json_encode('ok');
}

if ($_GET['action'] == 'semesters') {
    $semesters = $pRepo->semesters($_GET['id']);
    echo json_encode($semesters);
}

if ($_GET['action'] == 'upsertSemester') {
    $pRepo->upsertSemester($_POST);
    echo json_encode('ok');
}