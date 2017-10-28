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
    
    public function cities($province_id) {
        $sql = 'SELECT * FROM cities WHERE province_id = :province_id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':province_id', $province_id, PDO::PARAM_INT);
        $pdostmt->execute();
        $cities = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $cities;
    }
    
}