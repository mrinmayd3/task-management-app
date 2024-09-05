import { z } from "zod";

export const registerFormSchema = z.object({
  username: z.string().min(1).max(20),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
