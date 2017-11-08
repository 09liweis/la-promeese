<?php

class SchoolApplication {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function applications($student_id) {
        $sql = 'SELECT 
                pga.id AS id,
                pga.service_id AS service_id,
                s.name AS service_name,
                pga.ouac_confirmation_number as ouac_confirmation_number,
                pga.ouac_account AS ouac_account,
                pga.ouac_password AS ouac_password,
                pga.email AS email,
                pga.email_password AS email_password,
                pga.service_fee AS service_fee,
                pga.commission_progress_id AS commission_progress_id,
                cp.name AS commission_progress_name,
                pga.schools AS schools,
                pga.student_id AS student_id,
                pga.employee_id AS employee_id,
                e.name AS employee_name,
                pga.employee_material_id AS employee_material_id,
                em.name AS employee_material_name,
                pga.remark AS remark
                FROM 
                post_graduate_applications pga
                LEFT JOIN services s ON pga.service_id = s.id
                LEFT JOIN commission_progresses cp ON pga.commission_progress_id = cp.id
                LEFT JOIN employees e ON pga.employee_id = e.id
                LEFT JOIN employees_material em ON pga.employee_material_id = em.id
                WHERE pga.student_id = :student_id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':student_id', $student_id);
        $pdostmt->execute();
        $schools = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $schools;
    }
    public function upsert($school) {
        $columns = '';
        $values = '';
        $updates = '';
        foreach ($school as $column => $value) {
            $columns .= $column . ',';
            $values .= ':' . $column . ',';
            if ($column != 'id') {
                $updates .= $column . '= VALUES(`' . $column . '`),';
            }
        }
        $columns = rtrim($columns, ',');
        $values = rtrim($values, ',');
        $updates = rtrim($updates, ',');
        $sql = 'INSERT INTO post_graduate_applications (' . $columns . ') VALUES (' . $values . ') ON DUPLICATE KEY UPDATE ' . $updates . ';';
        $pdostmt = $this->db->prepare($sql);
        foreach ($school as $c => $v) {
            $pdostmt->bindValue(':' . $c, $v, PDO::PARAM_INT);
        }
        $pdostmt->execute();
    }
    
    public function remove($id) {
        $sql = 'DELETE FROM post_graduate_applications WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
    public function removeByStudent($id) {
        $sql = 'DELETE FROM post_graduate_applications WHERE student_id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
}