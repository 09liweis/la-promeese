<?php

class Student {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function students() {
        $sql = 'SELECT * FROM students';
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
}