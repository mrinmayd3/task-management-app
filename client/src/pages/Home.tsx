// components
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <section>
      <AddTask />

      <TaskList />
    </section>
  );
}
