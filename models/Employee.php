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
    public function updateLastLogin($id) {
        $ip = $_SERVER['REMOTE_ADDR'];
        $sql = 'UPDATE employees SET last_login = NOW(), ip = :ip WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_STR);
        $pdostmt->bindValue(':ip', $ip, PDO::PARAM_STR);
        $pdostmt->execute();
    }
    public function upsert($employee) {
        $columns = '';
        $values = '';
        $updates = '';
        foreach ($employee as $column => $value) {
            $columns .= $column . ',';
            $values .= ':' . $column . ',';
            if ($column != 'id') {
                $updates .= $column . '= VALUES(`' . $column . '`),';
            }
        }
        $columns = rtrim($columns, ',');
        $values = rtrim($values, ',');
        $updates = rtrim($updates, ',');
        $sql = 'INSERT INTO employees (' . $columns . ') VALUES (' . $values . ') ON DUPLICATE KEY UPDATE ' . $updates . ';';
        $pdostmt = $this->db->prepare($sql);
        foreach ($employee as $c => $v) {
            $pdostmt->bindValue(':' . $c, $v, PDO::PARAM_STR);
        }
        $pdostmt->execute();
    }
}