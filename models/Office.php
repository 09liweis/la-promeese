<?php

class Office {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function offices() {
        $sql = 'SELECT * FROM offices';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $offices = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $offices;
    }
    
    public function upsert($office) {
        $columns = '';
        $values = '';
        $updates = '';
        foreach ($office as $column => $value) {
            $columns .= $column . ',';
            $values .= ':' . $column . ',';
            if ($column != 'id') {
                $updates .= $column . '= VALUES(`' . $column . '`),';
            }
        }
        $columns = rtrim($columns, ',');
        $values = rtrim($values, ',');
        $updates = rtrim($updates, ',');
        $sql = 'INSERT INTO offices (' . $columns . ') VALUES (' . $values . ') ON DUPLICATE KEY UPDATE ' . $updates . ';';
        $pdostmt = $this->db->prepare($sql);
        foreach ($office as $c => $v) {
            $pdostmt->bindValue(':' . $c, $v, PDO::PARAM_INT);
        }
        $pdostmt->execute();
    }
}