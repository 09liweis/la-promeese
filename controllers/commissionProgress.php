<?php

require '../models/Database.php';
require '../models/CommissionProgress.php';

header('Content-Type: application/json');

$cpRepo = new CommissionProgress(Database::dbConnect());

if ($_GET['action'] == 'getCommissionProgress') {
    $result = $cpRepo->commissionProgresses($_GET['type']);
    echo json_encode($result);
}