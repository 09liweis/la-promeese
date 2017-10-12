<?php

class Office {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function offices() {
        $sql = 'SELECT * FROM offices';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $offices = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $offices;
    }
}