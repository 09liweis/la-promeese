<?php
require 'Service.php';
require 'Progress.php';

class Student {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }

    public function students($search, $limit = null) {
        if (isset($limit)) {
            $limit = 25;
            if (isset($search['page'])) {
                $page = $search['page'] - 1;
            } else {
                $page = 0;
            }
            $offset = $page * $limit;
        }
        $schoolProgressId = $search['school_progress_id'];
        
        $sql = 'SELECT 
                s.id as id,
                s.name AS name,
                s.visa_date AS visa_date,
                s.passport_date AS passport_date,
                s.phone AS phone,
                s.employee_id AS employee_id,
                s.updated_at AS updated_at,
                e.name AS employee_name,
                em.name AS employee_material_name,
                s.service_id AS service_id,
                ss.name AS service_name,
                s.service_fee AS service_fee,
                s.schools AS schools,
                s.school_progress_id AS school_progress_id,
                p.name AS school_progress_name,
                s.visa_progress_id AS visa_progress_id,
                p2.name AS visa_progress_name
                FROM 
                students s
                LEFT JOIN employees e ON s.employee_id = e.id
                LEFT JOIN employees_material em ON s.employee_material_id = em.id
                LEFT JOIN services ss ON s.service_id = ss.id
                LEFT JOIN cities c ON s.city_id = c.id
                LEFT JOIN progresses p ON s.school_progress_id = p.id
                LEFT JOIN progresses p2 ON s.visa_progress_id = p2.id
                WHERE 1';
        if ($search['name'] != '') {
            $sql .= ' AND (s.name LIKE :name OR s.schools LIKE :name)';
        }
        // if ($search['employee_id'] != '') {
        //     $sql .= ' AND s.employee_id = :employee_id';
        // }
        // if ($search['employee_material_id'] != '') {
        //     $sql .= ' AND s.employee_material_id = :employee_material_id';
        // }

        if ($search['color'] != '') {
            switch($search['color']) {
                case 'green':
                    $sql .= ' AND s.visa_date >= NOW() AND DATEDIFF(s.visa_date, NOW()) < 90';
                    break;
                case 'brown':
                    $sql .= ' AND s.visa_date < NOW()';
                    break;
            }
        }
        $sql .= ' ORDER BY s.id DESC';
        if (isset($limit)) {
            $sql .= ' LIMIT :limit OFFSET :offset';
        }

        $pdostmt = $this->db->prepare($sql);
        
        if (isset($limit)) {
            $pdostmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $pdostmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        }
        
        if ($search['name'] != '') {
            $name = '%'.$search['name'].'%';
            $pdostmt->bindValue(':name', $name, PDO::PARAM_STR);
        }

        if ($schoolProgressId != '') {
            $pdostmt->bindValue(':school_progress_id', $schoolProgressId, PDO::PARAM_INT);
        }
        // if ($search['visa_service_id'] != '') {
        //     $pdostmt->bindValue(':visa_service_id', $search['visa_service_id'], PDO::PARAM_INT);
        // }
        if ($search['visa_progress_id'] != '') {
            $pdostmt->bindValue(':visa_progress_id', $search['visa_progress_id'], PDO::PARAM_INT);
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
                s.passport_number AS passport_number,
                s.passport_date AS passport_date,
                s.status AS status,
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
                o.name AS office_name,
                s.employee_id AS employee_id,
                e.name AS employee_name,
                s.service_id AS service_id,
                ss.name AS service_name,
                s.remark AS remark
                FROM 
                students s
                LEFT JOIN services ss ON s.service_id = ss.id
                LEFT JOIN agencies a ON s.agency_id = a.id
                LEFT JOIN offices o ON s.office_id = o.id
                LEFT JOIN regions r ON s.region_id = r.id
                LEFT JOIN provinces p ON s.province_id = p.id
                LEFT JOIN cities c ON s.city_id = c.id
                LEFT JOIN employees e ON s.employee_id = e.id
                WHERE s.id = :student_id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':student_id', $student_id, PDO::PARAM_INT);
        $pdostmt->execute();
        $student = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $student;
    }
    public function upsert($student) {
        if ($student['id'] == 0) {
            $student['created_at'] = date('Y-m-d H:i:s');
        }
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
        // $employee_id = $student['employee_id'];
        // $employee_material_id = $student['employee_material_id'];
        $student_id = $student['student_id'];
        $service_id = $student['service_id'];
        $sub_service_id = $student['sub_service_id'];
        if ($service_id == 0) return;
        $progress_id = $student['progress_id'];
        $schools = $student['schools'];
        $service_fee = $student['service_fee'];
        $new_date = $student['new_date'];
        
        if ($service_id == '7' && in_array($sub_service_id, array('53', '54', '55'))) {
            $progress_id = $student['extra_progress_id'] ? $student['extra_progress_id'] : $student['progress_id'];
            $new_date = $student['extra_new_date'] ? $student['extra_new_date'] : $student['new_date'];
        }
        $willUpdateVisaDate = $service_id == '7' && in_array($sub_service_id, array('48', '49', '50', '51', '52', '83', '84', '85')) && $progress_id == '11';
        
        // $sRepo = new Service(Database::dbConnect());
        // $service = $sRepo->getService($service_id);
        
        // $pRepo = new Progress(Database::dbConnect());
        // $progress = $pRepo->getProgress($progress_id);

        $sql = 'UPDATE students SET ';
        if (in_array($service_id, array('1', '2', '3'))) {
            $sql .= 'school_progress_id = :progress_id,';    
        }
        if (in_array($service_id, array('7', '8', '9'))) {
            $sql .= 'visa_progress_id = :progress_id,';
        }
        if ($service_fee) {
            $sql .= 'service_fee = :service_fee,';
        }
        
        if ($willUpdateVisaDate) {
            $sql .= 'visa_date = :visa_date,';
        }
        
        if ($schools) {
            $sql .= 'schools = :schools,';
        }
        $sql .= 'service_id = :service_id WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);

        // $pdostmt->bindValue(':employee_id', $employee_id, PDO::PARAM_INT);
        // $pdostmt->bindValue(':employee_material_id', $employee_material_id, PDO::PARAM_INT);
        
        $pdostmt->bindValue(':service_id', $service_id, PDO::PARAM_INT);
        if (in_array($service_id, array('1', '2', '3', '7', '8', '9'))) {
            $pdostmt->bindValue(':progress_id', $progress_id, PDO::PARAM_INT);
        }
        
        if ($willUpdateVisaDate) {
            $pdostmt->bindValue(':visa_date', $new_date, PDO::PARAM_STR);
        }
        if ($schools) {
            $pdostmt->bindValue(':schools', $schools, PDO::PARAM_INT);
        }
        if ($service_fee) {
            $pdostmt->bindValue(':service_fee', $service_fee, PDO::PARAM_INT);
        }
        $pdostmt->bindValue(':id', $student_id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
    public function checkPassport($passport) {
        $sql = 'SELECT id, passport_number FROM students WHERE passport_number = :passport_number';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':passport_number', $passport, PDO::PARAM_STR);
        $pdostmt->execute();
        $exist = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $exist;
    }
    public function delete($id) {
        $sql = 'DELETE FROM students WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
    public function all() {
        $sql = 'SELECT id from students';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $students = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $students;
    }
    public function lastestPerformance($id) {
        $sql = 'SELECT p.service_id, s.progress_id, p.updated_at
                FROM performances p
                LEFT JOIN semesters s ON p.id = s.performance_id
                WHERE p.student_id = :id
                ORDER BY p.updated_at
                LIMIT 1';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
        $p = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $p;
    }
    
    public function allPerformances($id) {
        $sql = 'SELECT ss.name
                FROM performances p
                LEFT JOIN sub_services ss ON p.sub_service_id = ss.id
                WHERE p.student_id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
        $ps = $pdostmt->fetchAll(PDO::FETCH_COLUMN);
        return $ps;
    }

    public function lastestVisa($id) {
        $sql = 'SELECT service_id, progress_id, employee_id, employee_material_id, new_date, updated_at, service_fee
                FROM businesses
                WHERE student_id = :id AND service_id NOT IN (10, 11)
                ORDER BY updated_at DESC
                LIMIT 1';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
        $v = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $v;
    }
}