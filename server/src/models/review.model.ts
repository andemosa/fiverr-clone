import { Schema, model, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IReview {
  gig: Types.ObjectId;
  user: Types.ObjectId;
  star: number;
  description: string;
  _doc: Omit<this, "_doc">;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IReview>(
  {
    gig: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Gig",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
const Review = model<IReview>("Review", schema);

export { Review, IReview };
