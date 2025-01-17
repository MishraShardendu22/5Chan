import dbConnect from "@/database/database.connect";
import UserModel from "@/model/user.model";
import { sendResponse } from "@/util/Response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    await dbConnect();

    try{
        const { username,code } = await req.json();
        const user = await UserModel.findOne({
            username
        })

        if(!user){
            return sendResponse(404, "User not found");
        }

        if(new Date(user.verificationCodeExpiry) < new Date() || user.verificationCode !== code){
            return sendResponse(403, "Invalid code");
        }

        user.isVerified = true;
        await user.save();

        return sendResponse(200, "User verified");
    }catch(error){
        console.error(error);
        return sendResponse(500, "Internal server error");
    }
}