import { Schema, model, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IOrder {
  gig: Types.ObjectId;
  image: string;
  title: string;
  price: number;
  seller: Types.ObjectId;
  buyer: Types.ObjectId;
  completed: boolean;
  payment_intent: string;
  _doc: Omit<this, "_doc">;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IOrder>(
  {
    gig: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Gig",
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    payment_intent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
const Order = model<IOrder>("Order", schema);

export { Order, IOrder };
