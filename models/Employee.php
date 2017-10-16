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
    public function login($email, $password) {
        $sql = 'SELECT id, name, email, admin_level FROM employees WHERE email = :email AND password = :password';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':email', $email, PDO::PARAM_STR);
        $pdostmt->bindValue(':password', $password, PDO::PARAM_STR);
        $pdostmt->execute();
        $employee = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $employee;
    }
    public function upsert($employee) {
        
    }
}