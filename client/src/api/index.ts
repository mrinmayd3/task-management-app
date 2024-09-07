import axios from "axios";
import { LogInFormSchemaType } from "../schemas/loginFormSchema";
import { RegisterFormSchemaType } from "../schemas/registerFormSchema";
import { TaskFormSchemaType } from "../schemas/taskFormSchema";
import { TaskType } from "../types/Task";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8081";

axios.defaults.baseURL = baseUrl;

export const logIn = async (values: LogInFormSchemaType) =>
  await axios.post("/api/v1/users/login", values);

export const registerHandler = async (values: RegisterFormSchemaType) =>
  await axios.post("/api/v1/users/register", values);

export const getUser = () =>
  axios.get("/api/v1/users/current").then((res) => res.data);

// get tasks handlers
export const getTasks = async () => {
  const res = await axios.get("/api/v1/tasks");
  return res.data as TaskType[];
};

export const getTask = async (id: string) => {
  const res = await axios.get(`/api/v1/tasks/${id}`);
  return res.data as TaskType;
};

export const addTask = async (values: TaskFormSchemaType) => {
  const res = await axios.post("/api/v1/tasks", values);
  return res.data;
};

export const updateTask = async (id: string, values: TaskFormSchemaType) => {
  const res = await axios.put(`/api/v1/tasks/${id}`, values);
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await axios.delete(`/api/v1/tasks/${id}`);
  return res.data;
};
