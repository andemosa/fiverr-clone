import { object, string, TypeOf } from "zod";

export const RegisterSchema = object({
  body: object({
    username: string({
      required_error: "Username is required",
    }).min(1, { message: "Username is required" }),
    password: string({
      required_error: "Password is required",
    })
      .min(1, { message: "Password is required" })
      .min(6, "Password too short - should be 6 chars minimum"),
    email: string({
      required_error: "Email is required",
    })
      .min(1, { message: "Email is required" })
      .email("Not a valid email"),
    country: string({
      required_error: "Country is required",
    }).min(1, { message: "Country is required" }),
  }),
});

export const LoginSchema = object({
  body: object({
    username: string({
      required_error: "Username is required",
    }).min(1, { message: "Username is required" }),
    password: string({
      required_error: "Password is required",
    })
      .min(1, { message: "Password is required" })
      .min(6, "Password too short - should be 6 chars minimum"),
  }),
});

export type RegisterInput = TypeOf<typeof RegisterSchema>;

export type LoginInput = TypeOf<typeof LoginSchema>;
