<?php

require '../models/Database.php';
require '../models/Student.php';

header('Content-Type: application/json');

$sRepo = new Student(Database::dbConnect());

if ($_GET['action'] == 'getStudents') {
    $students = $sRepo->students();
    echo json_encode($students);
}

if ($_GET['action'] == 'upsertStudent') {
    $sRepo->upsert($_POST);
    echo json_encode('ok');
}