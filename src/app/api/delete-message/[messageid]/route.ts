/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/database/database.connect";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { sendResponse } from "@/util/Response";
import UserModel from "@/model/user.model";

export async function DELETE(request: NextRequest, { params }: { params: { messageid: string } }){
    const messageId = params.messageid
    await dbConnect();

    const session = await getServerSession(authOptions)
    const UserNew = session?.user

    if(!session || !UserNew){
        return sendResponse(401, 'Unauthorized')
    }

    try{
        const updateResult = await UserModel.updateOne(
            {_id: UserNew._id},
            {
                $pull: {
                    messages: {
                        _id: messageId
                    }
                }
            }
        )

        if(updateResult.modifiedCount === 0){
            return sendResponse(404, 'Message not found')
        }

        return sendResponse(200, 'Message deleted')
    }catch(error){
        console.log(error)
        return sendResponse(500, 'Internal Server Error')
    }
}