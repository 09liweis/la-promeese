<?php

function upsert($db, $table, $model) {
    $columns = '';
    $values = '';
    $updates = '';
    foreach ($model as $column => $value) {
        $columns .= $column . ',';
        $values .= ':' . $column . ',';
        if ($column != 'id') {
            $updates .= $column . '= VALUES(`' . $column . '`),';
        }
    }
    $columns = rtrim($columns, ',');
    $values = rtrim($values, ',');
    $updates = rtrim($updates, ',');
    $sql = 'INSERT INTO ' . $table .' (' . $columns . ') VALUES (' . $values . ') ON DUPLICATE KEY UPDATE ' . $updates . ';';
    $pdostmt = $db->prepare($sql);
    foreach ($model as $c => $v) {
        $pdostmt->bindValue(':' . $c, $v, PDO::PARAM_INT);
    }
    $pdostmt->execute();
    return $db->lastInsertId();
}