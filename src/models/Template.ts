import mongoose, { Schema, Document } from "mongoose";

interface ITemplate extends Document {
  name: string;
  code: string;
  status: boolean;
}

const TemplateSchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: Boolean, required: true },
});

const Template =
  mongoose.models.Template ||
  mongoose.model<ITemplate>("Template", TemplateSchema);

export default Template;
