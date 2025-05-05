import { z } from "zod";

// Zod validation functions

export const otpSchema = z.object({
  code: z.string().min(6, { message: "Should be 6 characters..." }),
});
