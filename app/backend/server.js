const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "tareas_db",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/tareas", (req, res) => {
  pool.query("SELECT * FROM tareas", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post("/api/tareas", (req, res) => {
  const { nombre, descripcion } = req.body;
  pool.query(
    "INSERT INTO tareas (nombre, descripcion, estado) VALUES (?, ?, 'pendiente')",
    [nombre, descripcion],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, nombre, descripcion, estado: "pendiente" });
    }
  );
});

app.put("/api/tareas/:id", (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  const { id } = req.params;
  pool.query(
    "UPDATE tareas SET nombre=?, descripcion=?, estado=? WHERE id=?",
    [nombre, descripcion, estado, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ id, nombre, descripcion, estado });
    }
  );
});

app.delete("/api/tareas/:id", (req, res) => {
  pool.query("DELETE FROM tareas WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Servidor backend corriendo en puerto " + PORT);
});
