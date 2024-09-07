import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema, TaskFormSchemaType } from "../schemas/taskFormSchema";
import { useQueryClient } from "@tanstack/react-query";

import SubmitBtn from "./SubmitBtn";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { TaskType, updateTask } from "../api";

export default function UpdateTask({
  task,
  closeModal,
}: {
  task: TaskType;
  closeModal: () => void;
}) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormSchemaType>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: task,
  });

  const onSubmitHandler: SubmitHandler<TaskFormSchemaType> = async (values) => {
    // console.log(values);

    try {
      const data = await updateTask(task._id, values);

      if (data) {
        await queryClient.invalidateQueries({ queryKey: ["tasks"] });
        toast.success("Task updated successfully");
        reset();
        closeModal();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong please try again");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Update task</h1>

        <button onClick={closeModal} className="cursor-pointer">
          <XMarkIcon className="size-6 hover:size-7" />
        </button>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <input
            className="w-full border border-black p-2 rounded-md"
            type="text"
            placeholder="Enter a title"
            {...register("title")}
          />
          {errors.title && (
            <small className="text-red-500">{errors.title.message}</small>
          )}
        </div>
        <div>
          <textarea
            className="w-full border border-black p-2 rounded-md"
            placeholder="Enter a description"
            {...register("description")}
          ></textarea>
          {errors.description && (
            <small className="text-red-500">{errors.description.message}</small>
          )}
        </div>

        <div>
          <label>
            <input type="checkbox" {...register("complete")} />
            Task complete
          </label>
          {errors.complete && (
            <small className="text-red-500">{errors.complete.message}</small>
          )}
        </div>

        <SubmitBtn text="Update task" isPending={isSubmitting} />
      </form>
    </>
  );
}
