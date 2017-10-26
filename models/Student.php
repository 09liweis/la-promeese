<?php
require 'Service.php';
require 'Progress.php';

class Student {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function students($search) {
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
                a.name AS agency_name,
                s.service AS service,
                s.service_fee AS service_fee,
                s.progress AS progress,
                e.name AS employee_name,
                em.name AS employee_material_name
                FROM 
                students s
                LEFT JOIN employees e ON s.employee_id = e.id
                LEFT JOIN employees_material em ON s.employee_material_id = em.id
                LEFT JOIN agencies a ON s.agency_id = a.id WHERE 1';
        if ($search['name'] != '') {
            $sql .= ' AND s.name LIKE :name';
        }
        if ($search['employee_id'] != '') {
            $sql .= ' AND s.employee_id = :employee_id';
        }
        if ($search['employee_material_id'] != '') {
            $sql .= ' AND s.employee_material_id = :employee_material_id';
        }
        if ($search['start_date'] != '') {
            $sql .= ' AND s.visa_date >= :start_date';
        }
        if ($search['end_date'] != '') {
            $sql .= ' AND s.visa_date <= :end_date';
        }
        $pdostmt = $this->db->prepare($sql);
        if ($search['name'] != '') {
            $pdostmt->bindValue(':name', '%'.$search['name'].'%', PDO::PARAM_STR);
        }
        if ($search['employee_id'] != '') {
            $pdostmt->bindValue(':employee_id', $search['employee_id'], PDO::PARAM_INT);
        }
        if ($search['employee_material_id'] != '') {
            $pdostmt->bindValue(':employee_material_id', $search['employee_material_id'], PDO::PARAM_INT);
        }
        if ($search['start_date'] != '') {
            $pdostmt->bindValue(':start_date', $search['start_date'], PDO::PARAM_STR);
        }
        if ($search['end_date'] != '') {
            $pdostmt->bindValue(':end_date', $search['end_date'], PDO::PARAM_STR);
        }
        $pdostmt->execute();
        $students = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $students;
    }
    public function student($student_id) {
        $sql = 'SELECT 
                s.id as id,
                s.name AS name,
                s.visa_date AS visa_date,
                s.visa_info AS visa_info,
                s.passport_date AS passport_date,
                s.phone AS phone,
                s.email AS email,
                s.gender AS gender,
                s.dob AS dob,
                s.updated_at AS updated_at,
                s.agency_id AS agency_id,
                a.name AS agency_name,
                s.region_id AS region_id,
                r.name AS region_name,
                s.province_id AS province_id,
                p.name AS province_name,
                s.city_id AS city_id,
                c.name AS city_name,
                s.office_id AS office_id,
                o.name AS office_name
                FROM 
                students s
                LEFT JOIN agencies a ON s.agency_id = a.id
                LEFT JOIN offices o ON s.office_id = o.id
                LEFT JOIN regions r ON s.region_id = r.id
                LEFT JOIN provinces p ON s.province_id = p.id
                LEFT JOIN cities c ON s.city_id = c.id
                WHERE s.id = :student_id';
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
        $employee_id = $student['employee_id'];
        $employee_material_id = $student['employee_material_id'];
        $student_id = $student['student_id'];
        $service_id = $student['service_id'];
        $sub_service_id = $student['sub_service_id'];
        $service_fee = $student['fee'] ? $student['fee'] : $student['service_fee'];
        $progress_id = $student['progress_id'];
        $sRepo = new Service(Database::dbConnect());
        $pRepo = new Progress(Database::dbConnect());
        $service = $sRepo->getService($service_id);
        $subService = $sRepo->getSubService($sub_service_id);
        $progress = $pRepo->getProgress($progress_id);
        $progress_name = $progress['name'];
        if ($student['schools']) {
            $schools = json_decode($student['schools'], true);
            $progress_name = $schools[0]['progress_name'];
        }
        $sql = 'UPDATE students SET
                service = :service,
                service_fee = :service_fee,
                progress = :progress,
                employee_id = :employee_id,
                employee_material_id = :employee_material_id
                WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':progress', $progress_name, PDO::PARAM_STR);
        $pdostmt->bindValue(':service', $service['name'], PDO::PARAM_STR);
        $pdostmt->bindValue(':service_fee', $service_fee, PDO::PARAM_INT);
        $pdostmt->bindValue(':employee_id', $employee_id, PDO::PARAM_INT);
        $pdostmt->bindValue(':employee_material_id', $employee_material_id, PDO::PARAM_INT);
        $pdostmt->bindValue(':id', $student_id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
}