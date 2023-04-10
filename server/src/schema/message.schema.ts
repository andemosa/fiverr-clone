import { object, string, TypeOf } from "zod";

export const CreateMessageSchema = object({
  body: object({
    conversation: string({
      required_error: "Id of conversation is required",
    }).min(1, { message: "Id of conversation is required" }),
    content: string({
      required_error: "Content is required",
    }).min(1, { message: "Content is required" }),
  }),
});

export type CreateMessageInput = TypeOf<typeof CreateMessageSchema>;
