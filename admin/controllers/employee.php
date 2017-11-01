<?php

require '../models/Database.php';
require '../models/Employee.php';

header('Content-Type: application/json');

$empRepo = new Employee(Database::dbConnect());

session_start();

if ($_GET['action'] == 'getEmployees') {
    $employees = $empRepo->employees();
    echo json_encode($employees);
}

if ($_GET['action'] == 'getEmployeesMaterial') {
    $employees = $empRepo->employeesMaterial();
    echo json_encode($employees);
}

if ($_GET['action'] == 'login') {
    $user = $_POST['user'];
    $email = $user['email'];
    $password = $user['password'];
    $employee = $empRepo->login($email, $password);
    if ($employee) {
        $_SESSION['id'] = $employee['id'];
        $_SESSION['name'] = $employee['name'];
        $_SESSION['email'] = $employee['email'];
        $_SESSION['admin_level'] = $employee['admin_level'];
        $empRepo->updateLastLogin($employee['id']);
        echo json_encode(array('code' => 200, 'data' => $_SESSION));
    } else {
        echo json_encode(array('code' => 404));
    }
}

if ($_GET['action'] == 'checkSession') {
    if (isset($_SESSION['id'])) {
        $empRepo->updateLastLogin($_SESSION['id']);
        echo json_encode(array('code' => 200, 'data' => $_SESSION));
    } else {
        echo json_encode(array('code' => 404, 'msg' => 'Not Login'));
    }
}

if ($_GET['action'] == 'logout') {
    session_destroy();
    echo json_encode(array('code' => 200));
}

if ($_GET['action'] == 'upsertEmployee') {
    $empRepo->upsert($_POST);
    echo json_encode(array('code' => 200));
}

if ($_GET['action'] == 'upsertEmployeeMaterial') {
    $empRepo->upsertMaterial($_POST);
    echo json_encode(array('code' => 200));
}

if ($_GET['action'] == 'removeEmployee') {
    $empRepo->remove($_POST['id']);
    echo json_encode('ok');
}

if ($_GET['action'] == 'removeEmployeeMaterial') {
    $empRepo->removeMaterial($_POST['id']);
    echo json_encode('ok');
}