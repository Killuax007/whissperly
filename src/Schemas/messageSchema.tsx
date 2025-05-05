import { z } from "zod";

// Zod validation functions

export const MessageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "At least 10 characters ..." })
    .max(100, { message: "Max 100 characters allowed ..." }),
});
