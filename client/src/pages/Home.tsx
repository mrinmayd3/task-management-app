// components
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import UserInfo from "../components/UserInfo";

export default function Home() {
  return (
    <>
      <section>
        <UserInfo />
      </section>
      <section>
        <AddTask />

        <TaskList />
      </section>
    </>
  );
}
