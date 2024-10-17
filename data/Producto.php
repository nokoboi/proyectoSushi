<?php

require_once 'Database.php';
require_once 'validator.php';

class Producto{
    private Database $db;

    public function __construct(){
        $this->db=new Database();
    }

    public function getAllProducts(){
        $result = $this->db->query("SELECT * from productos");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getProductById($id){
        $result = $this->db->query("SELECT * from productos where id=?",[$id]);
        return $result->fetch_assoc();
    }

    public function createProduct($nombre, $descripcion=null,$tipo,$precio=null,$imagen){
        $data = ['nombre'=>$nombre, 'descripcion'=>$descripcion,'tipo'=>$tipo, 'precio'=>$precio, 'imagen'=>$imagen];
        $dataSaneado=Validator::sanear($data);

        $nombreSaneado = $dataSaneado['nombre'];
        $descripcionSaneada=$dataSaneado['descripcion'];
        $tipoSaneado = $data['tipo'];
        $precioSaneado=$data['precio'];
        
        $this->db->query("INSERT INTO productos(nombre,descripcion,tipo,precio,imagen) values(?,?,?,?,?)",
        [$nombreSaneado,$descripcion,$tipoSaneado,$precioSaneado,$imagen]);

        return $this->db->query("SELECT LAST_INSERT_ID() as id")->fetch_assoc()['id'];
    }
}