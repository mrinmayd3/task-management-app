import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1).max(30),
  description: z.string().min(5).max(200),
  complete: z.boolean(),
});

export type TaskFormSchemaType = z.infer<typeof taskFormSchema>;
