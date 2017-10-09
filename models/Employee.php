<?php

class Employee {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function employees() {
        $sql = 'SELECT * FROM employees';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $employees = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $employees;
    }
}