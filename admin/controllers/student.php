<?php

require '../models/Database.php';
require '../models/Student.php';

header('Content-Type: application/json');

$sRepo = new Student(Database::dbConnect());

if ($_GET['action'] == 'getStudents') {
    if (isset($_GET['page'])) {
        $students = $sRepo->students($_GET, $_GET['page']);    
    } else {
        $students = $sRepo->students($_GET);   
    }
    echo json_encode($students);
}

if ($_GET['action'] == 'getTotalStudents') {
    $total = $sRepo->totalStudents();
    echo json_encode($total);
}

if ($_GET['action'] == 'getStudent') {
    $student = $sRepo->student($_GET['id']);
    echo json_encode($student);
}

if ($_GET['action'] == 'upsertStudent') {
    $sRepo->upsert($_POST);
    echo json_encode('ok');
}

if ($_GET['action'] == 'deleteStudent') {
    $sRepo->delete($_POST['id']);
    echo json_encode('ok');
}