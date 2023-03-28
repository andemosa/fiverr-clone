import { Schema, model, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IGig {
  title: string;
  description: string;
  totalStars?: number;
  starNumber?: number;
  category: string;
  price: number;
  coverImage: string;
  images?: string[];
  user: Types.ObjectId;
  shortTitle: string;
  shortDescription: string;
  deliveryTime: number;
  revisionNumber: number;
  features?: string[];
  sales?: number;
  _doc: Omit<this, "_doc">;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IGig>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    shortTitle: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    revisionNumber: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
const Gig = model<IGig>("Gig", schema);

export { Gig, IGig };
