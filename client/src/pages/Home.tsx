import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTasks } from "../api";

// components
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import UserInfo from "../components/UserInfo";
import TaskListSkeleton from "../components/TaskListSkeleton";

import { TaskType } from "../types/Task";
import useDebounce from "../hooks/useDebounce";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedInput, SetSelectedInput] = useState<boolean | null>(null);

  const debounceSearch = useDebounce(search);

  const {
    data: tasks,
    isPending,
    isError,
    error,
  } = useQuery<TaskType[], AxiosError>({
    queryKey: ["tasks", debounceSearch, selectedInput],
    queryFn: () => getTasks(debounceSearch, selectedInput),
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "true") {
      SetSelectedInput(true);
    } else if (e.target.value === "false") {
      SetSelectedInput(false);
    } else {
      SetSelectedInput(null);
    }
  };

  return (
    <>
      <section>
        <UserInfo />
      </section>
      <section>
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <input
              className="border border-black px-2 py-1 rounded-md"
              type="text"
              placeholder="Search here.."
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="px-2 py-1 rounded-md"
              name="complete"
              onChange={handleOnChange}
            >
              <option>Show all</option>
              <option value="true">Completed</option>
              <option value="false">Pending</option>
            </select>
          </div>
          <AddTask />
        </div>

        {tasks && <TaskList tasks={tasks} />}
        {isPending && <TaskListSkeleton />}
        {isError && <p>An error has occurred: {error?.message}</p>}
      </section>
    </>
  );
}
