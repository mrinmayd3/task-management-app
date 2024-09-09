import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteTask } from "../api";
import {
  TrashIcon,
  PencilSquareIcon,
  CalendarDateRangeIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { TaskType } from "../types/Task";

export default function Task({
  task,
  openModal,
}: {
  task: TaskType;
  openModal: (task: TaskType) => void;
}) {
  const [btnLoading, setBtnLoading] = useState(false);
  const queryClient = useQueryClient();

  const deleteTaskHandler = async () => {
    setBtnLoading(true);
    try {
      await deleteTask(task._id);

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    } catch (error) {
      toast.error("Something went wrong please try again");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className={`p-4 shadow-lg rounded ${btnLoading ? "bg-gray-300" : ""}`}>
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
      <p
        className={`text-3xl text-wrap ${task.complete ? "line-through" : ""}`}
      >
        {task.title}
      </p>
      <p className="text-gray-700 text-xs flex gap-1">
        <CalendarDateRangeIcon className="size-4" />{" "}
        {new Date(task.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-800">{task.description}</p>

      <div className="flex justify-between mt-2">
        <button
          onClick={deleteTaskHandler}
          className="hover:text-red-500 hover:scale-90 disabled:cursor-not-allowed"
          disabled={btnLoading}
        >
          {btnLoading ? "loading.." : <TrashIcon className="size-5" />}
        </button>

        <button
          onClick={() => openModal(task)}
          className="hover:text-blue-500 hover:scale-90 disabled:cursor-not-allowed"
          disabled={btnLoading}
        >
          <PencilSquareIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}
