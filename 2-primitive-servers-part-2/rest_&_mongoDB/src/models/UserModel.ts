import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  login: string;
  pass: string;
 items: [];
}
const User: Schema = new mongoose.Schema({
  login: { type: "string", required: true, unique: true },
  pass: { type: "string" , required: true },
  items: {type:"array"}
});

export default mongoose.model<IUser>("User", User);
