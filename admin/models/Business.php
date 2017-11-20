<?php

class Business {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function businesses($student_id) {
        $sql = 'SELECT 
                b.id AS id,
                b.submit_date AS submit_date,
                b.new_date AS new_date,
                b.student_id AS student_id,
                b.service_id AS service_id,
                s.name AS service_name,
                b.sub_service_id AS sub_service_id,
                ss.name AS sub_service_name,
                b.government_fee AS government_fee,
                b.service_fee AS service_fee,
                b.post_fee AS post_fee,
                b.application_fee AS application_fee,
                b.progress_id AS progress_id,
                ps.name AS progress_name,
                b.employee_id AS employee_id,
                e.name AS employee_name,
                b.employee_material_id AS employee_material_id,
                em.name AS employee_material_name,
                b.remark AS remark,
                b.extra_new_date AS extra_new_date,
                b.extra_submit_date AS extra_submit_date,
                b.extra_progress_id AS extra_progress_id,
                pps.name AS extra_progress_name,
                b.last_modified_id AS last_modified_id,
                ee.name AS last_modified_name,
                b.updated_at AS updated_at
                FROM 
                businesses b 
                LEFT JOIN services s ON b.service_id = s.id
                LEFT JOIN sub_services ss ON b.sub_service_id = ss.id
                LEFT JOIN progresses ps ON b.progress_id = ps.id
                LEFT JOIN progresses pps ON b.extra_progress_id = pps.id
                LEFT JOIN employees e ON b.employee_id = e.id
                LEFT JOIN employees_material em ON b.employee_material_id = em.id
                LEFT JOIN employees ee ON b.last_modified_id = ee.id
                WHERE b.student_id = :student_id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':student_id', $student_id);
        $pdostmt->execute();
        $businesses = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $businesses;
    }
    public function upsert($business) {
        session_start();
        $business['last_modified_id'] = $_SESSION['id'];
        $columns = '';
        $values = '';
        $updates = '';
        foreach ($business as $column => $value) {
            $columns .= $column . ',';
            $values .= ':' . $column . ',';
            if ($column != 'id') {
                $updates .= $column . '= VALUES(`' . $column . '`),';
            }
        }
        $columns = rtrim($columns, ',');
        $values = rtrim($values, ',');
        $updates = rtrim($updates, ',');
        $sql = 'INSERT INTO businesses (' . $columns . ') VALUES (' . $values . ') ON DUPLICATE KEY UPDATE ' . $updates . ';';
        $pdostmt = $this->db->prepare($sql);
        foreach ($business as $c => $v) {
            $pdostmt->bindValue(':' . $c, $v, PDO::PARAM_INT);
        }
        $pdostmt->execute();
    }
    
    public function remove($id) {
        $sql = 'DELETE FROM businesses WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
    public function removeByStudent($id) {
        $sql = 'DELETE FROM businesses WHERE student_id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
    public function lastestSchool($studentId) {
        $sql = 'SELECT 
                s.name as service_name,
                b.service_id as service_id,
                ps.name AS progress_name,
                b.progress_id AS progress_id,
                b.employee_id AS employee_id,
                e.name AS employee_name,
                b.employee_material_id AS employee_material_id,
                em.name AS employee_material_name
                FROM 
                businesses b 
                LEFT JOIN services s ON b.service_id = s.id
                LEFT JOIN progresses ps ON b.progress_id = ps.id
                LEFT JOIN employees e ON b.employee_id = e.id
                LEFT JOIN employees_material em ON b.employee_material_id = em.id
                WHERE b.student_id = :student_id AND b.service_id in (4, 10)
                ORDER BY b.updated_at DESC LIMIT 1';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':student_id', $studentId);
        $pdostmt->execute();
        $business = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $business;
    }
    public function lastestVisa($studentId) {
        $sql = 'SELECT 
                s.name as service_name,
                b.service_id as service_id,
                ps.name AS progress_name,
                b.progress_id AS progress_id,
                b.employee_id AS employee_id,
                e.name AS employee_name,
                b.employee_material_id AS employee_material_id,
                em.name AS employee_material_name
                FROM 
                businesses b 
                LEFT JOIN services s ON b.service_id = s.id
                LEFT JOIN progresses ps ON b.progress_id = ps.id
                LEFT JOIN employees e ON b.employee_id = e.id
                LEFT JOIN employees_material em ON b.employee_material_id = em.id
                WHERE b.student_id = :student_id AND b.service_id in (7,8,9)
                ORDER BY b.updated_at DESC LIMIT 1';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':student_id', $studentId);
        $pdostmt->execute();
        $business = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $business;
    }
}