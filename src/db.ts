import mongoose, { Schema, Types, model } from "mongoose";
export async function connectMongo() {
  await mongoose.connect("");
}
connectMongo();

interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = model<IUser>("User", userSchema);

interface ITodos {
  userId: Types.ObjectId;
  title: string;
  description: string;
  completed: boolean;
  dateCreated: Date;
}

const TodosSchema = new Schema<ITodos>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  completed: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now() },
});

export const Todos = model("Todos", TodosSchema);
// module.exports = {
//   User,
//   Todos,
// };
