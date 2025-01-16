import mongoose, { Schema,Document } from "mongoose";
import { Message } from "./message.model";

export interface User extends Document {
    email: string;
    username: string;
    password: string;
    verifyCode: string;
    messages: Message[];
    isVerified: boolean;
    verifyCodeExpiry: Date;
    isAcceptingMessages: boolean;
}

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true,"This field is required"],
            unique: true,
        },
        email: {
            type: String,
            required: [true,"This field is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true,"This field is required"],
        },
        verifyCode: {
            type: String,
            required: [true,"This field is required"],
        },
        verifyCodeExpiry: {
            type: Date,
            required: [true,"This field is required"],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isAcceptingMessages: {
            type: Boolean,
            default: true,
        },
        messages: {
            type: [Schema.Types.ObjectId],
            ref: 'Message',
        }
    },
    {
        timestamps: true,
    }
)

const UserModel = mongoose.models.User || mongoose.model<User>('User', UserSchema);
export default UserModel