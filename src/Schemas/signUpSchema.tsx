import { z } from "zod";

// Zod validation functions
export const usernameValidator = z
  .string()
  .min(3, "Username is too short..")
  .max(10, "Username exceeds the limit of 10 characters....")
  .regex(
    /^[a-zA-Z0-9._-]+$/,
    "Username contains invalid characters. Only letters, numbers, dots, and underscores are allowed."
  );

export const signUpSchema = z.object({
  username: usernameValidator,
  email: z.string().email({ message: "Please enter a valid email address..." }),
  password: z.string().min(6, { message: "Atleast 6 character allowed..." }),
});
