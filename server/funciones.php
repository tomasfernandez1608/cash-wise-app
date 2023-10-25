<?php
function obtenerUsuarios()
{
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT * FROM usuario");
    return $sentencia->fetchAll();
}
function obtenerConexion()
{
    // $password = obtenerVariableDelEntorno("MYSQL_PASSWORD");
    // $user = obtenerVariableDelEntorno("MYSQL_USER");
    // $dbName = obtenerVariableDelEntorno("MYSQL_DATABASE_NAME");
    $dbName = "cash-wise";
    // $host = "localhost";
    $user = "root";
    $password = "";

    try {
        $database = new PDO('mysql:host=localhost;dbname=' . $dbName, $user, $password);
        $database->query("set names utf8;");
        $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
        $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
        return $database;

    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
?>
