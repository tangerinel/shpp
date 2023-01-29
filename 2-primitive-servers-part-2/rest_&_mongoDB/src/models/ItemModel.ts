import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  text: string;
  checked: boolean;
}
const Item: Schema = new mongoose.Schema({
  text: { type: "string", required: true },
  checked: { type: "boolean", required: true },
});

export default mongoose.model<IItem>("Item", Item);
