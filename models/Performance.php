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
                p.fee AS fee,
                ps.name AS progress_name,
                p.progress_id AS progress_id,
                p.commission_progress_id AS commission_progress_id,
                cp.name AS commission_progress_name,
                p.employee_id AS employee_id,
                e.name AS employee_name,
                p.employee_material_id AS employee_material_id,
                em.name AS employee_material_name
                FROM 
                performances p JOIN services s ON p.service_id = s.id
                JOIN sub_services ss ON p.sub_service_id = ss.id
                JOIN progresses ps ON p.progress_id = ps.id
                JOIN commission_progresses cp ON p.commission_progress_id = cp.id
                JOIN employees e ON p.employee_id = e.id
                JOIN employees_material em ON p.employee_material_id = em.id
                WHERE p.student_id = :student_id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':student_id', $student_id);
        $pdostmt->execute();
        $performances = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $performances;
    }
    public function upsert($performance) {
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
}