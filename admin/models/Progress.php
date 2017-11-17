<?php

class Progress {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }

    public function progresses($service_id = null) {
        if (isset($service_id)) {
            $schoolServiceId = array('1', '2', '3', '4', '5', '6');
            //all school application have same progress
            if (in_array($service_id, $schoolServiceId)) {
                $service_id = 4;
            }
            $sql = 'SELECT * FROM progresses WHERE service_id = :service_id';
        } else {
            $sql = 'SELECT DISTINCT(name) FROM progresses';
        }
        $pdostmt = $this->db->prepare($sql);
        if (isset($service_id)) {
            $pdostmt->bindValue(':service_id', $service_id, PDO::PARAM_INT);   
        }
        $pdostmt->execute();
        $progresses = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $progresses;
    }
    
    public function getProgress($progress_id) {
        $sql = 'SELECT * FROM progresses WHERE id = :progress_id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':progress_id', $progress_id, PDO::PARAM_INT);
        $pdostmt->execute();
        $progress = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $progress;
    }
    
    public function getVisaImmiProgresses() {
        $sql = 'SELECT DISTINCT(name) FROM progresses WHERE service_id in (7, 8)';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $progresses = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $progresses;
    }
    public function getSchoolProgresses() {
        $sql = 'SELECT DISTINCT(name) FROM progresses WHERE service_id = 4';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $progresses = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $progresses;
    }
}