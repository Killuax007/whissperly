import { z } from "zod";

// Zod validation functions

export const AcceptMessageSchema = z.object({
  acceptMessage: z.boolean(),
});
