import { z } from "zod";

// Zod validation functions

export const signInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
