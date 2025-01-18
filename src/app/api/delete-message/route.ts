/* eslint-disable @typescript-eslint/no-explicit-any */
import UserModel from "@/model/user.model";
import { sendResponse } from "@/util/Response";
import { NextResponse } from "next/server";

export async function POST(response: NextResponse){
    try {
        const { id, messageId } = await response.json();

        if (!id || !messageId) {
            return sendResponse(400, "Missing required fields.");
        }

        const user = await UserModel.findById(id);
        if (!user) {
            return sendResponse(404, "User not found.");
        }

        const messageIndex = user.messages.findIndex(msg => (msg._id as any).toString() === messageId);
        if (messageIndex === -1){
            return sendResponse(404, "Message not found.");
        }

        user.messages.splice(messageIndex, 1);
        await user.save();

        return sendResponse(200, "Message deleted.");
    } catch (error) {
        console.error("Error fetching messages:", error);
        return sendResponse(500, "Failed to fetch messages.");
    }
}
