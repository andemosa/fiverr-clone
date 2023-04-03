import { number, object, string, TypeOf } from "zod";

export const CreateReviewSchema = object({
  body: object({
    gig: string({
      required_error: "Gig id is required",
    }).min(1, { message: "Gig id is required" }),
    description: string({
      required_error: "Description is required",
    }).min(1, { message: "Description is required" }),
    star: number({
      required_error: "Star rating is required",
    })
      .min(1, { message: "Star rating cannot be less than 1" })
      .max(5, { message: "Star rating cannot be greater than 5" }),
  }),
});

export type CreateReviewInput = TypeOf<typeof CreateReviewSchema>;
