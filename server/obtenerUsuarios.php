<?php

$dominioPermitido = "http://localhost:5173";
header("Access-Control-Allow-Origin: $dominioPermitido");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

include_once "funciones.php";
$id = $_GET["id"];
$usuarios = obtenerUsuarios();
echo json_encode($usuarios);
?>