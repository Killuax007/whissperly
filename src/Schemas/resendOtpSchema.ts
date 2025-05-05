import { usernameValidator } from "./signUpSchema";
import { z } from "zod";
export const resendOtpSchema = z.object({
  username: usernameValidator,
  email: z.string().email({ message: "Invalid email address" }),
});
