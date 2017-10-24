<?php

class Agency {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function agencies() {
        $sql = 'SELECT * FROM agencies';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $agencies = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $agencies;
    }
}