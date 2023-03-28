import { number, object, string, TypeOf } from "zod";

export const CreateGigSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }).min(1, { message: "Title is required" }),
    description: string({
      required_error: "Description is required",
    }).min(1, { message: "Description is required" }),
    category: string({
      required_error: "Category is required",
    }).min(1, { message: "Category is required" }),
    price: number({
      required_error: "Price is required",
    }),
    coverImage: string({
      required_error: "Cover image is required",
    }).min(1, { message: "Cover image is required" }),
    shortTitle: string({
      required_error: "Short title is required",
    }).min(1, { message: "Short title is required" }),
    shortDescription: string({
      required_error: "Short description is required",
    }).min(1, {
      message: "Short description is required",
    }),
    deliveryTime: number({
      required_error: "Delivery time is required",
    }),
    revisionNumber: number({
      required_error: "Revision number is required",
    }),
  }),
});

export type CreateGigInput = TypeOf<typeof CreateGigSchema>;
