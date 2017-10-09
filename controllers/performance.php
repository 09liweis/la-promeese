<?php

require '../models/Database.php';
require '../models/Performance.php';

header('Content-Type: application/json');

$pRepo = new Performance(Database::dbConnect());

if ($_GET['action'] == 'upsertPerformance') {
    $sRepo->upsert($_POST);
    echo json_encode('ok');
}