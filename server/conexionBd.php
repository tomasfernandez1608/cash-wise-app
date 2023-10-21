<?php
function Conexion()
{
    $dbName = "cash-wise";
    $host = "localhost/phpmyadmin/";
    $user = "";
    $password = "";

    try {
        $database = new PDO('mysql:host=' . $host . ';dbname=' . $dbName, $user, $password);
        $database->query("set names utf8;");
        $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
        $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
        return $database;

    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}