import axios from "axios";
import { LogInFormSchemaType } from "../schemas/loginFormSchema";
import { RegisterFormSchemaType } from "../schemas/registerFormSchema";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8081";

axios.defaults.baseURL = baseUrl;

export const logIn = async (values: LogInFormSchemaType) =>
  await axios.post("/api/v1/users/login", values);

export const registerHandler = async (values: RegisterFormSchemaType) =>
  await axios.post("/api/v1/users/register", values);
