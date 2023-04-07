import { object, string, TypeOf } from "zod";

export const CreateConversationSchema = object({
  body: object({
    to: string({
      required_error: "Id of user to create conversation with is required",
    }).min(1, { message: "Id of user to create conversation with is required" }),
  }),
});

export type CreateConversationInput = TypeOf<typeof CreateConversationSchema>;
