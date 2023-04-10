import { Schema, model, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IMessage {
  conversation: string;
  user: Types.ObjectId;
  content: string;
  _doc: Omit<this, "_doc">;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IMessage>(
  {
    conversation: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
const Message = model<IMessage>("Message", schema);

export { Message, IMessage };
