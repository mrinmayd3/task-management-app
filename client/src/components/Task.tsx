import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteTask, TaskType } from "../api";
import {
  TrashIcon,
  PencilSquareIcon,
  CalendarDateRangeIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import UpdateTask from "./UpdateTask";

export default function Task({ task }: { task: TaskType }) {
  const updateDialogRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();

  const openModal = () => {
    updateDialogRef.current?.showModal();
  };

  const closeModal = () => {
    updateDialogRef.current?.close();
  };

  const deleteTaskHandler = async () => {
    try {
      await deleteTask(task._id);

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    } catch (error) {
      toast.error("Something went wrong please try again");
    }
  };

  return (
    <div className="p-4 shadow rounded">
      <small
        className={`flex items-center gap-1 ${
          task.complete ? "text-green-500" : "text-yellow-500"
        }`}
      >
        {task.complete ? (
          <>
            <CheckBadgeIcon className="size-4" />
            <span>complete</span>
          </>
        ) : (
          <>
            <ExclamationTriangleIcon className="size-4" />
            <span>pending</span>
          </>
        )}
      </small>
      <p className="text-3xl text-wrap">{task.title}</p>
      <p className="text-gray-700 text-xs flex gap-1">
        <CalendarDateRangeIcon className="size-4" />{" "}
        {new Date(task.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-800">{task.description}</p>

      <div className="flex justify-between mt-2">
        <button onClick={deleteTaskHandler} className="hover:text-red-500">
          <TrashIcon className="size-5" />
        </button>

        <button onClick={openModal}>
          <PencilSquareIcon className="size-5" />
        </button>
      </div>

      {/* update task modal */}
      <div>
        <dialog
          ref={updateDialogRef}
          className="w-[400px] p-5 rounded-md backdrop:bg-black/35"
        >
          <UpdateTask task={task} closeModal={closeModal} />
        </dialog>
      </div>
    </div>
  );
}
