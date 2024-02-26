import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  cpf: string;
  status: string;
  role: string;
  usesEPI: boolean;
  healthCertificate: string;
  activities: Array<{
    name: string;
    EPIs: string[];
  }>;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  status: { type: String, required: true },
  role: { type: String, required: true },
  usesEPI: { type: Boolean, required: true },
  healthCertificate: { type: String, required: true },
  activities: [
    {
      name: { type: String, required: true },
      EPIs: [{ type: String, required: true }],
    },
  ],
});

export default mongoose.model<IUser>("User", UserSchema);
