<?php

require '../models/Database.php';
require '../models/Student.php';

header('Content-Type: application/json');

$sRepo = new Student(Database::dbConnect());

if ($_GET['action'] == 'getStudents') {
    if (isset($_GET['page'])) {
        $currentPage = $_GET['page'];
        $students = $sRepo->students($_GET, $_GET['page']);
    } else {
        $currentPage = 0;
        $students = $sRepo->students($_GET);   
    }
    $total = $sRepo->totalStudents();
    $result = array(
        'data' => $students,
        'total' => $total,
        'current' => $currentPage
    );
    echo json_encode($result);
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