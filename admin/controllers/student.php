<?php

require '../models/Database.php';
require '../models/Student.php';
require '../models/Performance.php';
require '../models/Business.php';
require '../models/SchoolApplication.php';
require '../models/Employee.php';

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
    $eRepo = new Employee(Database::dbConnect());
    session_start();
    $email = $_SESSION['email'];
    $login = $eRepo->login($email, $_POST['password']);
    if ($login) {
        $pRepo = new Performance(Database::dbConnect());
        $pRepo->removeByStudent($_POST['id']);
        
        $bRepo = new Business(Database::dbConnect());
        $bRepo->removeByStudent($_POST['id']);
        
        $saRepo = new SchoolApplication(Database::dbConnect());
        $saRepo->removeByStudent($_POST['id']);
        
        $sRepo->delete($_POST['id']);
        echo json_encode('ok');
    } else {
        echo json_encode('fail');
    }
}