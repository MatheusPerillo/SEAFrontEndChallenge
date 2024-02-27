import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  cpf: string;
  rg: string;
  gender: string;
  dateOfBirth: string;
  status: string;
  role: string;
  usesEPI: boolean;
  healthCertificate?: string;
  activities?: Array<{
    name?: string;
    EPIs?: Array<{
      name?: string;
      CA?: string;
    }>;
  }>;
}

const EPISchema: Schema = new Schema({
  name: { type: String },
  CA: { type: String },
});

const ActivitySchema: Schema = new Schema({
  name: { type: String },
  EPIs: [EPISchema],
  epiNames: [String],
});

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  rg: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  status: { type: String, required: true },
  role: { type: String, required: true },
  usesEPI: { type: Boolean, required: true },
  healthCertificate: { type: String },
  activities: [ActivitySchema],
});

export default mongoose.model<IUser>("User", UserSchema);
