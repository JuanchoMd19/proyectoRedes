import { useCallback, useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tareas, setTareas] = useState([]);

  const API = process.env.REACT_APP_API_URL + "/api/tareas";

  const loadTareas = useCallback(async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTareas(data);
  }, [API]);

  useEffect(() => {
    loadTareas();
  }, [loadTareas]);

  const addTarea = async (tarea) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarea),
    });

    const nueva = await res.json();
    setTareas([...tareas, nueva]);
  };

  const deleteTarea = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setTareas(tareas.filter((t) => t.id !== id));
  };

  const updateTarea = async (id, nueva) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nueva),
    });

    const editada = await res.json();
    setTareas(tareas.map((t) => (t.id === id ? editada : t)));
  };

  const changeEstado = async (id, estadoActual) => {
    const orden = ["pendiente", "completada", "cancelada"];
    const next = orden[(orden.indexOf(estadoActual) + 1) % 3];

    const res = await fetch(`${API}/${id}/estado`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: next }),
    });

    const data = await res.json();

    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, estado: data.estado } : t))
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gesto de tareas V3</h1>

      <TaskForm onAdd={addTarea} />

      <TaskList
        tareas={tareas}
        onDelete={deleteTarea}
        onUpdate={updateTarea}
        onEstado={changeEstado}
      />
    </div>
  );
}

export default App;
