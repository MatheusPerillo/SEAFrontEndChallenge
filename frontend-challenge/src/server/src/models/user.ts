import mongoose, { Document, Schema } from "mongoose";

interface IUserEPI extends Document {
  id?: string;
  name?: string;
  ca?: string;
}

export interface IUser extends Document {
  _id?: string;
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
    epis?: Array<IUserEPI>;
  }>;
}
export type UserDocument = IUser & Document;

const EPISchema: Schema = new Schema({
  name: { type: String },
  ca: { type: String },
});

const ActivitySchema: Schema = new Schema({
  name: { type: String },
  epis: [EPISchema],
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

export default mongoose.model<UserDocument>("User", UserSchema);
