import { Schema, model, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IConversation {
  id: string;
  seller: Types.ObjectId;
  buyer: Types.ObjectId;
  readBySeller: boolean;
  readByBuyer: boolean;
  lastMessage: string;
  _doc: Omit<this, "_doc">;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IConversation>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
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
    readBySeller: {
      type: Boolean,
      required: true,
    },
    readByBuyer: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
const Conversation = model<IConversation>("Conversation", schema);

export { Conversation, IConversation };
