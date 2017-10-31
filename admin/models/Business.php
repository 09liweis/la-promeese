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
                em.name AS employee_material_name
                FROM 
                businesses b 
                LEFT JOIN services s ON b.service_id = s.id
                LEFT JOIN sub_services ss ON b.sub_service_id = ss.id
                LEFT JOIN progresses ps ON b.progress_id = ps.id
                LEFT JOIN employees e ON b.employee_id = e.id
                LEFT JOIN employees_material em ON b.employee_material_id = em.id
                WHERE b.student_id = :student_id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':student_id', $student_id);
        $pdostmt->execute();
        $businesses = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $businesses;
    }
    public function upsert($business) {
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
}