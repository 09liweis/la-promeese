<?php

require '../models/Database.php';
require '../models/Performance.php';
require '../models/Student.php';

header('Content-Type: application/json');

$pRepo = new Performance(Database::dbConnect());
$sRepo = new Student(Database::dbConnect());

if ($_GET['action'] == 'getPerformances') {
    $performances = $pRepo->performances($_GET['id']);
    foreach ($performances as &$p) {
        $p['semesters'] = $pRepo->semesters($p['id']);
    }
    echo json_encode($performances);
}

if ($_GET['action'] == 'upsertPerformance') {
    $pRepo->upsert($_POST);
    
    $semester = $pRepo->getLatestSemester($_POST['id']);
    $_POST['progress_id'] = $semester['progress_id'];
    
    $schools = $pRepo->getschools($_POST['student_id'],$_POST['service_id']);
    $schoolString = implode('<br/>', $schools);
    $_POST['schools'] = $schoolString;
    $sRepo->updateStudent($_POST);
    echo json_encode('ok');
}

if ($_GET['action'] == 'removePerformance') {
    $pRepo->remove($_POST['id']);
    $pRepo->removeSemesters($_POST['id']);
    echo json_encode('ok');
}

if ($_GET['action'] == 'semesters') {
    $semesters = $pRepo->semesters($_GET['id']);
    echo json_encode($semesters);
}

if ($_GET['action'] == 'upsertSemester') {
    $pRepo->upsertSemester($_POST);
    $p = $pRepo->performance($_POST['performance_id']);
    $_POST['service_id'] = $p['service_id'];
    $_POST['employee_id'] = $p['employee_id'];
    $_POST['employee_material_id'] = $p['employee_material_id'];
    $_POST['student_id'] = $p['student_id'];
    
    $sRepo = new Student(Database::dbConnect());
    $sRepo->updateStudent($_POST);
    echo json_encode('ok');
}
if ($_GET['action'] == 'removeSemester') {
    $pRepo->removeSemester($_POST['id']);
    echo json_encode('ok');
}