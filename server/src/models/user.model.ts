import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  country?: string;
  phone?: string;
  description?: string;
  isSeller?: boolean;
  _doc: Omit<this, "_doc">;
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    description: {
      type: String,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;

  return next();
});

schema.method(
  "comparePassword",
  function comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password).catch((e) => false);
  }
);

// 3. Create a Model.
const User = model<IUser, UserModel>("User", schema);

export { User, IUser };
