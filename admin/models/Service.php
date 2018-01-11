<?php

include '../functions/db.php';

class Service {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function services($free = null) {
        $sql = 'SELECT * FROM services';
        if (isset($free)) {
            $sql .= ' WHERE is_free = :free';
            if ($free == 0) {
                //remove 101/105 school application on paid service
                $sql .= ' AND (id != 5 AND id != 6)';
            }   
        }
        $pdostmt = $this->db->prepare($sql);
        if (isset($free)) {
            $pdostmt->bindValue(':free', $free, PDO::PARAM_INT);   
        }
        $pdostmt->execute();
        $services = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $services;
    }
    
    public function getServicesBy($param) {
        $id = $param['id'];
        $free = $param['is_free'];
        $sql = 'SELECT * FROM services WHERE 1';
        if ($id) {
            $sql .= ' AND id = :id';
        }
        if ($free) {
            $sql .= ' AND is_free = :free';
        }
        $pdostmt = $this->db->prepare($sql);
        if (isset($id)) {
            $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        }
        if (isset($free)) {
            $pdostmt->bindValue(':free', $free, PDO::PARAM_INT);
        }
        $pdostmt->execute();
        $services = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $services;
    }
    
    public function subServices($service_id) {
        if (in_array($service_id, array('5', '6'))) {
            $service_id = 5;
        }
        $sql = 'SELECT * FROM sub_services WHERE service_id = :service_id';
        if ($service_id == 5) {
            $sql .= ' ORDER BY name ASC';
        }
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':service_id', $service_id, PDO::PARAM_INT);
        $pdostmt->execute();
        $subServices = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $subServices;
    }
    
    public function postGradServices() {
        $sql = 'SELECT * FROM services WHERE id = 5 OR id = 6';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $schoolServices = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $schoolServices;
    }
    public function schoolServices() {
        $sql = 'SELECT * FROM services WHERE type = "school"';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $schoolServices = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $schoolServices;
    }
    public function visaServices() {
        $sql = 'SELECT * FROM services WHERE id in (7,8,9)';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $visaServices = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $visaServices;
    }
    public function getService($id) {
        $sql = 'SELECT name FROM services WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
        $service = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $service;
    }
    public function getSubService($id) {
        $sql = 'SELECT name FROM sub_services WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
        $subService = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $subService;
    }
    public function upsertSubService($subService) {
        $id = upsert($this->db, 'sub_services', $subService);
        return $id;
    }
}