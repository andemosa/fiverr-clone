import { object, string, TypeOf } from "zod";

export const RegisterSchema = object({
  body: object({
    username: string().min(1, { message: "Username is required" }),
    password: string()
      .min(1, { message: "Password is required" })
      .min(6, "Password too short - should be 6 chars minimum"),
    email: string()
      .min(1, { message: "Email is required" })
      .email("Not a valid email"),
    country: string().min(1, { message: "Country is required" }),
  }),
});

export const LoginSchema = object({
  body: object({
    username: string().min(1, { message: "Username is required" }),
    password: string()
      .min(1, { message: "Password is required" })
      .min(6, "Password too short - should be 6 chars minimum"),
  }),
});

export type RegisterInput = TypeOf<typeof RegisterSchema>;

export type LoginInput = TypeOf<typeof LoginSchema>;
