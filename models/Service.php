<?php

class Service {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function services($free) {
        $sql = 'SELECT * FROM services WHERE is_free = :free';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':free', $free, PDO::PARAM_INT);
        $pdostmt->execute();
        $services = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $services;
    }
    
    public function subServices($service_id) {
        $sql = 'SELECT * FROM sub_services WHERE service_id = :service_id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':service_id', $service_id, PDO::PARAM_INT);
        $pdostmt->execute();
        $subServices = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $subServices;
    }
}