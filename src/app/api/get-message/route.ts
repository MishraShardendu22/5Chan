import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/database/database.connect";
import { sendResponse } from "@/util/Response";
import { getServerSession } from "next-auth";
import UserModel from "@/model/user.model";

export async function GET(){
    await dbConnect();
    const session = await getServerSession(authOptions)
    const UserNew = session?.user

    if(!session || !UserNew){
        return sendResponse(401, 'Unauthorized')
    }

    try{
        const messages = await UserModel.findOne(
            {_id: UserNew._id}
        ).select('messages')

        if(!messages){
            return sendResponse(200, 'No messages found')
        }

        return sendResponse(200, messages.messages)
    }catch(error){
        console.log(error)
        return sendResponse(500, 'Internal Server Error')
    }
}