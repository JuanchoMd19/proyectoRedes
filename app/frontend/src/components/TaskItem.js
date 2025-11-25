export default function TaskItem({ tarea, onDelete, onUpdate, onEstado }) {
  return (
    <li style={{ marginBottom: "10px" }}>
      <strong>{tarea.nombre}</strong> — {tarea.descripcion}  
      <br />
      <span>Estado: {tarea.estado}</span>
      <br /><br />

      <button onClick={() => onEstado(tarea.id, tarea.estado)}>
        Cambiar estado
      </button>

      <button onClick={() => onDelete(tarea.id)}>Eliminar</button>

      <button
        onClick={() =>
          onUpdate(tarea.id, {
            nombre: prompt("Nuevo nombre:", tarea.nombre),
            descripcion: prompt("Nueva descripción:", tarea.descripcion),
            estado: tarea.estado
          })
        }
      >
        Editar
      </button>
    </li>
  );
}
