CREATE DATABASE IF NOT EXISTS tareasdb;

USE tareasdb;

CREATE TABLE IF NOT EXISTS tareas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  descripcion TEXT,
  estado ENUM('pendiente', 'completada', 'cancelada') DEFAULT 'pendiente'
);
