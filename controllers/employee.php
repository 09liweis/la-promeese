<?php

require '../models/Database.php';
require '../models/Employee.php';

header('Content-Type: application/json');

$empRepo = new Employee(Database::dbConnect());

if ($_GET['action'] == 'getEmployees') {
    $employees = $empRepo->employees();
    echo json_encode($employees);
}

if ($_GET['action'] == 'upsertStudent') {
    $empRepo->upsert($_POST);
    echo json_encode('ok');
}