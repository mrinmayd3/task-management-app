import { z } from "zod";

export const logInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

export type LogInFormSchemaType = z.infer<typeof logInFormSchema>;
