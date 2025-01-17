import dbConnect from "@/database/database.connect";
import MessageModel from "@/model/message.model";
import UserModel from "@/model/user.model";
import { sendResponse } from "@/util/Response";
import { NextRequest } from "next/server";

export async function POST(reqeust: NextRequest){
    await dbConnect();

    const { username, message } = await reqeust.json();
    try{
        const user = await UserModel.findOne({
            username
        })

        if(!user){
            return sendResponse(404, "User not found");
        }

        if(!user.isAcceptingMessages){
            return sendResponse(403, "User is not accepting messages");
        }

        const newMessage = new MessageModel({
            content: message,
            createdAt: new Date(),
        })

        user.messages.push(newMessage);
        await user.save();

        return sendResponse(200, "Message sent");
    }catch(error){
        console.error(error);
        return sendResponse(500, "Internal server error");
    }
}