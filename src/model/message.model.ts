import mongoose, { Schema,Document, Model } from 'mongoose';

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema = new Schema(
    {
        content: {
            type: String,
            required: [true," This field is required"],
        },
        createdAt: {
            type: Date,
            required: [true," This field is required"],
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
)

const MessageModel: Model<Message> = mongoose.models.Message || mongoose.model<Message>('Message', MessageSchema);
export default MessageModel