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
    $_GET['name'] = urldecode($_GET['name']);
    $_GET['service'] = urldecode(($_GET['service']));
    $students = $sRepo->students($_GET, 25);
    $total = count($sRepo->students($_GET));
    $result = array(
        'data' => $students,
        'total' => $total,
        'search' => array(
            'page' => $_GET['page'],
            'name' => isset($_GET['name']) ? $_GET['name'] : '',
            'employee_id' => isset($_GET['employee_id']) ? $_GET['employee_id'] : '',
            'employee_material_id' => isset($_GET['employee_material_id']) ? $_GET['employee_material_id'] : '',
            'service' => isset($_GET['service']) ? $_GET['service'] : '',
            'progress' => isset($_GET['progress']) ? $_GET['progress'] : '',
            'color' => isset($_GET['color']) ? $_GET['color'] : ''
        )
    );
    echo json_encode($result);
}

if ($_GET['action'] == 'getStudent') {
    $student = $sRepo->student($_GET['id']);
    echo json_encode($student);
}

if ($_GET['action'] == 'upsertStudent') {
    if ($_POST['passport_number'] != '') {
        $exist = $sRepo->checkPassport($_POST['passport_number']);   
        if ($exist && $exist['id'] != $_POST['id']) {
            echo json_encode('fail');
        } else {
            $sRepo->upsert($_POST);   
            echo json_encode('ok');
        }
    } else {
        $sRepo->upsert($_POST);   
        echo json_encode('ok');
    }
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