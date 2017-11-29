<?php
require 'Model.php';

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
                pga.student_id AS student_id,
                pga.employee_id AS employee_id,
                e.name AS employee_name,
                pga.employee_material_id AS employee_material_id,
                em.name AS employee_material_name,
                pga.remark AS remark,
                pga.last_modified_id AS last_modified_id,
                ee.name AS last_modified_name,
                pga.updated_at AS updated_at
                FROM 
                post_graduate_applications pga
                LEFT JOIN services s ON pga.service_id = s.id
                LEFT JOIN commission_progresses cp ON pga.commission_progress_id = cp.id
                LEFT JOIN employees e ON pga.employee_id = e.id
                LEFT JOIN employees_material em ON pga.employee_material_id = em.id
                LEFT JOIN employees ee ON pga.last_modified_id = ee.id
                WHERE pga.student_id = :student_id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':student_id', $student_id);
        $pdostmt->execute();
        $schools = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $schools;
    }
    public function upsert($application, $schools) {
        session_start();
        $application['last_modified_id'] = $_SESSION['id'];
        $application['updated_at'] = date('Y-m-d H:i:s');
        $application['created_at'] = date('Y-m-d H:i:s');
        $model = new Model($this->db);
        $id = $model->upsert('post_graduate_applications', $application);
        if ($application['id']) {
            $this->removeSchoolApplication($application['id']);
        }
        $post_graduate_id = $application['id'] ? $application['id'] : $id;
        if (count($schools) > 0) {
            foreach ($schools as $school) {
                $school['post_graduate_application_id'] = $post_graduate_id;
                unset($school['sub_service_name']);
                unset($school['progress_name']);
                $this->upsertSchoolApplication($school);
            }
        }
    }
    
    public function remove($id) {
        $sql = 'DELETE FROM post_graduate_applications WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
        $this->removeSchoolApplication($id);
    }
    public function removeByStudent($id) {
        $sql = 'DELETE FROM post_graduate_applications WHERE student_id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
    public function getSchoolApplications($id) {
        $sql = 'SELECT 
                sa.post_graduate_application_id AS post_graduate_application_id,
                sa.sub_service_id AS sub_service_id,
                ss.name AS sub_service_name,
                sa.campus AS campus,
                sa.program AS program,
                sa.application_fee AS application_fee,
                sa.student_number AS student_number,
                sa.account AS account,
                sa.password AS password,
                sa.progress_id AS progress_id,
                p.name AS progress_name,
                sa.trace_number AS trace_number,
                sa.submit_date AS submit_date,
                sa.trace_number AS trace_number,
                sa.submit_date AS submit_date
                FROM 
                school_applications sa
                LEFT JOIN sub_services ss ON sa.sub_service_id = ss.id
                LEFT JOIN progresses p ON sa.progress_id = p.id
                WHERE sa.post_graduate_application_id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id);
        $pdostmt->execute();
        $schoolApps = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $schoolApps;
    }
    public function upsertSchoolApplication($app) {
        $model = new Model($this->db);
        $model->upsert('school_applications', $app);
    }
    public function removeSchoolApplication($id) {
        $sql = 'DELETE FROM school_applications WHERE post_graduate_application_id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
}