import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}
const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  otp: string;
  expireOtp: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const userSchema: Schema<User> = new Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: [true, "Email is required..."],
    unique: true,
    match: [/.+\@.+\..+/, "Please usea valid Email Address"],
  },
  password: { type: String, required: [true, "Password is required..."] },
  otp: { type: String, required: [true, "Otp is required.."] },
  expireOtp: { type: Date, required: true },
  isVerified: { type: Boolean, default: false },
  isAcceptingMessage: { type: Boolean, default: true },
  messages: [MessageSchema],
});

// creating models

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default UserModel;
