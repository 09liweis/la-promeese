<?php
require 'Service.php';

class Student {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function students() {
        $sql = 'SELECT 
                s.id as id,
                s.name AS name,
                s.visa_date AS visa_date,
                s.passport_date AS passport_date,
                s.phone AS phone,
                s.employee_id AS employee_id,
                e.name AS employee_name,
                s.updated_at AS updated_at,
                s.agency_id AS agency_id,
                a.name AS agency_name
                FROM 
                students s
                JOIN employees e ON s.employee_id = e.id
                LEFT JOIN agencies a ON s.agency_id = a.id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $students = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $students;
    }
    public function student($student_id) {
        $sql = 'SELECT * FROM students WHERE id = :student_id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':student_id', $student_id, PDO::PARAM_INT);
        $pdostmt->execute();
        $student = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $student;
    }
    public function upsert($student) {
        $columns = '';
        $values = '';
        $updates = '';
        foreach ($student as $column => $value) {
            $columns .= $column . ',';
            $values .= ':' . $column . ',';
            if ($column != 'id') {
                $updates .= $column . '= VALUES(`' . $column . '`),';
            }
        }
        $columns = rtrim($columns, ',');
        $values = rtrim($values, ',');
        $updates = rtrim($updates, ',');
        $sql = 'INSERT INTO students (' . $columns . ') VALUES (' . $values . ') ON DUPLICATE KEY UPDATE ' . $updates . ';';
        $pdostmt = $this->db->prepare($sql);
        foreach ($student as $c => $v) {
            $pdostmt->bindValue(':' . $c, $v, PDO::PARAM_INT);
        }
        $pdostmt->execute();
    }
    public function updateStudent($student) {
        $student_id = $student['student_id'];
        $service_id = $student['service_id'];
        $sub_service_id = $student['sub_service_id'];
        $service_fee = $student['fee'];
        $progress_id = $student['progress_id'];
        $sRepo = new Service(Database::dbConnect());
        $service = $sRepo->getService($service_id);
        $subService = $sRepo->getSubService($sub_service_id);
        $sql = 'UPDATE students SET
                service = :service,
                service_fee = :service_fee
                WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':service', $service['name'], PDO::PARAM_STR);
        $pdostmt->bindValue(':service_fee', $service_fee, PDO::PARAM_INT);
        $pdostmt->bindValue(':id', $student_id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
}