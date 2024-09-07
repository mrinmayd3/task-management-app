import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { taskFormSchema, TaskFormSchemaType } from "../schemas/taskFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { addTask } from "../api";

// component
import SubmitBtn from "./SubmitBtn";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function AddTask() {
  const addDialogRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormSchemaType>({
    resolver: zodResolver(taskFormSchema.omit({ complete: true })),
  });

  const openModal = () => {
    addDialogRef.current?.showModal();
  };

  const closeModal = () => {
    reset();
    addDialogRef.current?.close();
  };

  const onSubmitHandler: SubmitHandler<TaskFormSchemaType> = async (values) => {
    // console.log(values);
    try {
      const data = await addTask(values);

      if (data) {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        toast.success("New task added successfully");
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
    <div>
      <div className="flex justify-between items-center">
        <h1>Filter</h1>
        <button
          onClick={openModal}
          className="bg-black text-white px-2 py-1 rounded flex items-center gap-1 cursor-pointer transition hover:scale-95 hover:bg-black/80"
        >
          <PlusIcon className="size-5" /> <span>Add a task</span>
        </button>
      </div>

      <dialog
        ref={addDialogRef}
        className="w-[400px] p-5 rounded-md backdrop:bg-black/35"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add a task</h1>

          <button onClick={closeModal} className="cursor-pointer">
            <XMarkIcon className="size-6 hover:size-7" />
          </button>
        </div>

        <div>
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
                <small className="text-red-500">
                  {errors.description.message}
                </small>
              )}
            </div>

            <SubmitBtn text="Add" isPending={isSubmitting} />
          </form>
        </div>
      </dialog>
    </div>
  );
}
