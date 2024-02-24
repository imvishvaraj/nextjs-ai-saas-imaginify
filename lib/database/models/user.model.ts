// clearId, email, username, photo, firstName, lastName, planId, creditBalance
import { Document, Schema, model, models } from "mongoose";


export interface IUser extends Document {
    clerkId: string;
    email: string;
    username: string;
    photo?: string; // Optional since photo is not explicitly marked as required
    firstName: string;
    lastName: string;
    planId: string;
    creditBalance: number;
}

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    photo: { type: String, required: true }, // Optional
    firstName: { type: String },
    lastName: { type: String },
    planId: { type: String, default: 1 },
    creditBalance: { type: Number, default: 10 },
}); // Enable createdAt and updatedAt fields automatically

const User = models?.User || model('User', UserSchema);

export default User;