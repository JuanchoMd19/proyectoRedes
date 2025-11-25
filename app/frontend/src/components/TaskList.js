import TaskItem from "./TaskItem";

export default function TaskList({ tareas, onDelete, onUpdate, onEstado }) {
  return (
    <ul>
      {tareas.map((t) => (
        <TaskItem
          key={t.id}
          tarea={t}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onEstado={onEstado}
        />
      ))}
    </ul>
  );
}
