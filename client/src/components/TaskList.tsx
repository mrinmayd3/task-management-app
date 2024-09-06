import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { useAuth } from "../contexts/AuthContext";

import { getTasks, TaskType } from "../api";

// components
import Task from "./Task";

export default function TaskList() {
  const { updateToken } = useAuth();
  const navigate = useNavigate();

  const {
    data: tasks,
    isPending,
    isError,
    error,
  } = useQuery<TaskType[], AxiosError>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (isPending) return "Loading...";

  if (isError) {
    if (error.status === 401) {
      updateToken("");
      navigate("/login");
    } else {
      return "An error has occurred: " + error.message;
    }
  }

  return (
    <>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {tasks?.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
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
