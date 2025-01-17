import dbConnect from "@/database/database.connect"
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server"
import { authOptions } from "../auth/[...nextauth]/options";
import { sendResponse } from "@/util/Response";
import UserModel from "@/model/user.model";

export async function POST(request: NextRequest){
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user = session?.user
    if(!session || !session.user){
        return sendResponse(401, 'Unauthorized')
    }

    const userId = user?._id
    const { accept } = await request.json()

    try{
        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                isAcceptingMessages: accept
            }
        )

        if(!updateUser){
            return sendResponse(404, 'User not found')
        }

        return sendResponse(200, 'Success',updateUser)
    }catch(error){
        console.log(error)
        return sendResponse(500, 'Internal Server Error')
    }
}

export async function GET(){
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user = session?.user
    if(!session || !session.user){
        return sendResponse(401, 'Unauthorized')
    }

    const userId = user?._id

    try{
        const newUser = await UserModel.findById(userId)
        if(!user){
            return sendResponse(404, 'User not found')
        }

        return sendResponse(200, 'Success', newUser)
    }catch(error){
        console.log(error)
        return sendResponse(500, 'Internal Server Error')
    }
}