<?php

class Agency {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function agencies() {
        $sql = 'SELECT * FROM agencies';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $agencies = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $agencies;
    }
    
    public function upsert($agency) {
        $columns = '';
        $values = '';
        $updates = '';
        foreach ($agency as $column => $value) {
            $columns .= $column . ',';
            $values .= ':' . $column . ',';
            if ($column != 'id') {
                $updates .= $column . '= VALUES(`' . $column . '`),';
            }
        }
        $columns = rtrim($columns, ',');
        $values = rtrim($values, ',');
        $updates = rtrim($updates, ',');
        $sql = 'INSERT INTO agencies (' . $columns . ') VALUES (' . $values . ') ON DUPLICATE KEY UPDATE ' . $updates . ';';
        $pdostmt = $this->db->prepare($sql);
        foreach ($agency as $c => $v) {
            $pdostmt->bindValue(':' . $c, $v, PDO::PARAM_INT);
        }
        $pdostmt->execute();
    }
    
    public function remove($id) {
        $sql = 'DELETE FROM agencies WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_STR);
        $pdostmt->execute();
    }
}