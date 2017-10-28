<?php

require '../models/Database.php';
require '../models/Progress.php';

header('Content-Type: application/json');

$pRepo = new Progress(Database::dbConnect());

if ($_GET['action'] == 'getProgresses') {
    $progresses = $pRepo->progresses($_GET['id']);
    echo json_encode($progresses);
}