import { useEffect, useRef, useState } from "react";

// components
import Task from "./Task";
import UpdateTask from "./UpdateTask";

import { TaskType } from "../types/Task";

export default function TaskList({ tasks }: { tasks: TaskType[] }) {
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const updateDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!activeTask) return;

    updateDialogRef.current?.showModal();
  }, [activeTask]);

  const openModal = (task: TaskType) => {
    setActiveTask(task);
  };

  const closeModal = () => {
    setActiveTask(null);
    updateDialogRef.current?.close();
  };

  return (
    <>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {tasks?.map((task) => (
          <Task key={task._id} task={task} openModal={openModal} />
        ))}
      </div>
      {/* update task modal */}
      <dialog
        ref={updateDialogRef}
        className="w-[400px] p-5 rounded-md backdrop:bg-black/35"
      >
        {activeTask && <UpdateTask task={activeTask} closeModal={closeModal} />}
      </dialog>

      <div>
        {tasks && tasks?.length === 0 && (
          <h2 className="text-center text-5xl font-semibold text-gray-400">
            No task for now
          </h2>
        )}
      </div>
    </>
  );
}
