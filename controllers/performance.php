<?php

require '../models/Database.php';
require '../models/Performance.php';

header('Content-Type: application/json');

$pRepo = new Performance(Database::dbConnect());

if ($_GET['action'] == 'getPerformances') {
    $performances = $pRepo->performances($_GET['id']);
    echo json_encode($performances);
}

if ($_GET['action'] == 'upsertPerformance') {
    $pRepo->upsert($_POST);
    echo json_encode('ok');
}