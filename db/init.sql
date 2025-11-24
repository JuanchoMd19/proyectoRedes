CREATE DATABASE IF NOT EXISTS tareas_db;
USE tareas_db;

CREATE TABLE IF NOT EXISTS tareas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150),
  descripcion TEXT,
  estado ENUM('pendiente','completado','cancelado') DEFAULT 'pendiente'
);

INSERT INTO tareas (nombre, descripcion, estado) VALUES
('tarea 1', 'Mi primera tarea', 'pendiente'),
('tarea 2', 'Mi segunda tarea', 'pendiente');
