<?php

class Performance {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function performances($student_id) {
        $sql = 'SELECT 
                p.id as id, 
                p.student_id as student_id, 
                s.name as service_name,
                p.service_id as service_id,
                ss.name AS sub_service_name, 
                ss.id AS sub_service_id,
                p.semester AS semester,
                p.school_start_date,
                p.fee AS fee,
                p.tuition AS tuition,
                ps.name AS progress_name,
                p.progress_id AS progress_id,
                p.commission_progress_id AS commission_progress_id,
                cp.name AS commission_progress_name,
                p.remark AS remark,
                p.last_modified_id AS last_modified_id,
                ee.name AS last_modified_name,
                p.updated_at AS updated_at
                FROM 
                performances p 
                LEFT JOIN services s ON p.service_id = s.id
                LEFT JOIN sub_services ss ON p.sub_service_id = ss.id
                LEFT JOIN progresses ps ON p.progress_id = ps.id
                LEFT JOIN commission_progresses cp ON p.commission_progress_id = cp.id
                LEFT JOIN employees ee ON p.last_modified_id = ee.id
                WHERE p.student_id = :student_id
                ORDER BY p.id ASC';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':student_id', $student_id);
        $pdostmt->execute();
        $performances = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $performances;
    }
    public function upsert($performance) {
        if ($performance['id'] == 0) {
            $performance['created_at'] = date('Y-m-d H:i:s');
        }
        $performance['updated_at'] = date('Y-m-d H:i:s');
        session_start();
        $performance['last_modified_id'] = $_SESSION['id'];
        if (($performance['school_start_date']) != '') {
            $performance['school_start_date'] = substr($performance['school_start_date'], 0, 7);
        }
        $columns = '';
        $values = '';
        $updates = '';
        foreach ($performance as $column => $value) {
            $columns .= $column . ',';
            $values .= ':' . $column . ',';
            if ($column != 'id') {
                $updates .= $column . '= VALUES(`' . $column . '`),';
            }
        }
        $columns = rtrim($columns, ',');
        $values = rtrim($values, ',');
        $updates = rtrim($updates, ',');
        $sql = 'INSERT INTO performances (' . $columns . ') VALUES (' . $values . ') ON DUPLICATE KEY UPDATE ' . $updates . ';';
        $pdostmt = $this->db->prepare($sql);
        foreach ($performance as $c => $v) {
            $pdostmt->bindValue(':' . $c, $v, PDO::PARAM_INT);
        }
        $pdostmt->execute();
    }
    
    public function remove($id) {
        $sql = 'DELETE FROM performances WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
    public function removeByStudent($id) {
        $sql = 'DELETE FROM performances WHERE student_id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
    public function semesters($performance_id) {
        $sql = 'SELECT 
                se.id as id, 
                se.performance_id AS performance_id,
                se.semester AS semester,
                se.school_start_date,
                se.fee AS fee,
                ps.name AS progress_name,
                se.progress_id AS progress_id,
                se.commission_progress_id AS commission_progress_id,
                cp.name AS commission_progress_name,
                se.employee_id AS employee_id,
                e.name AS employee_name,
                se.employee_material_id AS employee_material_id,
                em.name AS employee_material_name,
                se.remark AS remark,
                se.last_modified_id AS last_modified_id,
                ee.name AS last_modified_name,
                se.updated_at AS updated_at
                FROM 
                semesters se 
                LEFT JOIN progresses ps ON se.progress_id = ps.id
                LEFT JOIN commission_progresses cp ON se.commission_progress_id = cp.id
                LEFT JOIN employees e ON se.employee_id = e.id
                LEFT JOIN employees_material em ON se.employee_material_id = em.id
                LEFT JOIN employees ee ON se.last_modified_id = ee.id
                WHERE se.performance_id = :performance_id
                ORDER BY se.id ASC';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':performance_id', $performance_id);
        $pdostmt->execute();
        $semesters = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $semesters;
    }
    public function removeSemesters($performance_id) {
        $sql = 'DELETE FROM semesters WHERE performance_id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $performance_id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
    public function upsertSemester($semester) {
        session_start();
        if ($semester['id'] == 0) {
            $semester['created_at'] = date('Y-m-d H:i:s');
        }
        $semester['updated_at'] = date('Y-m-d H:i:s');
        $semester['last_modified_id'] = $_SESSION['id'];
        if (($semester['school_start_date']) != '') {
            $semester['school_start_date'] = substr($semester['school_start_date'], 0, 7);
        }
        $columns = '';
        $values = '';
        $updates = '';
        foreach ($semester as $column => $value) {
            $columns .= $column . ',';
            $values .= ':' . $column . ',';
            if ($column != 'id') {
                $updates .= $column . '= VALUES(`' . $column . '`),';
            }
        }
        $columns = rtrim($columns, ',');
        $values = rtrim($values, ',');
        $updates = rtrim($updates, ',');
        $sql = 'INSERT INTO semesters (' . $columns . ') VALUES (' . $values . ') ON DUPLICATE KEY UPDATE ' . $updates . ';';
        $pdostmt = $this->db->prepare($sql);
        foreach ($semester as $c => $v) {
            $pdostmt->bindValue(':' . $c, $v, PDO::PARAM_INT);
        }
        $pdostmt->execute();
    }
    public function removeSemester($id) {
        $sql = 'DELETE FROM semesters WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
}