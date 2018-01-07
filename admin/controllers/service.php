<?php

require '../models/Database.php';
require '../models/Service.php';

header('Content-Type: application/json');

$sRepo = new Service(Database::dbConnect());

if ($_GET['action'] == 'getServices') {
    $services = $sRepo->services();
    echo json_encode($services);
}

if ($_GET['action'] == 'getFreeServices') {
    $services = $sRepo->services(1);
    echo json_encode($services);
}

if ($_GET['action'] == 'getPaidServices') {
    $services = $sRepo->services(0);
    echo json_encode($services);
}

if ($_GET['action'] == 'getSubServices') {
    $subServices = $sRepo->subServices($_GET['id']);
    echo json_encode($subServices);
}

if ($_GET['action'] == 'getPostGradServices') {
    $postGradServices = $sRepo->postGradServices();
    echo json_encode($postGradServices);
}
if ($_GET['action'] == 'getSchoolServices') {
    $schoolServices = $sRepo->schoolServices();
    echo json_encode($schoolServices);
}
if ($_GET['action'] == 'getVisaServices') {
    $visaServices = $sRepo->visaServices();
    echo json_encode($visaServices);
}
if ($_GET['action'] == 'upsertSubService') {
    $school = $_POST;
    $id = $sRepo->upsertSubService($school);
    echo json_encode($id);
}