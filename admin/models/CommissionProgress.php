<?php

class CommissionProgress {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function commissionProgresses($type) {
        $sql = 'SELECT * FROM commission_progresses WHERE type = :type';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':type', $type, PDO::PARAM_INT);
        $pdostmt->execute();
        $commissionProgresses = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $commissionProgresses;
    }
    
    public function commissionProgressesId($id) {
        $sql = 'SELECT * FROM commission_progresses WHERE service_id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
        $commissionProgresses = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $commissionProgresses;
    }
}