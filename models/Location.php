<?php

class Location {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function regions() {
        $sql = 'SELECT * FROM regions';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $regions = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $regions;
    }
    
    public function provinces($region_id) {
        $sql = 'SELECT * FROM provinces WHERE region_id = :region_id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':region_id', $region_id, PDO::PARAM_INT);
        $pdostmt->execute();
        $provinces = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $provinces;
    }
}