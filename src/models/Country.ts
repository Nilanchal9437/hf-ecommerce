import mongoose, { Schema, Document } from "mongoose";

interface ICountry extends Document {
  name: string;
  code: string;
  status: boolean;
}

const CountrySchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: Boolean, required: true }
});

const Country =
  mongoose.models.Country || mongoose.model<ICountry>("Country", CountrySchema);

export default Country;
