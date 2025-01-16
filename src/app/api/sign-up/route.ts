/* eslint-disable prefer-const */
import dbConnect from "@/database/database.connect";
import UserModel from "@/model/user.model";
import { sendResponse } from "@/util/Response";
import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs';
import { SendEmail } from "@/mail/SendEmail";

export async function POST(req: NextRequest){
    await dbConnect();

    try{
        const { username, email, password } = await req.json();

        const ExistingVerifiedUser = await UserModel.findOne(
            {
                username,
                isVerified: true
            }
        )
        if(ExistingVerifiedUser){
            return sendResponse(400, 'User already exists');
        }

        const ExistingUserEmail = await UserModel.findOne(
            {
                email
            }
        )
        let verifyCode = Math.floor(100000 + Math.random() * 900000);

        if(ExistingUserEmail){
            if(ExistingUserEmail.isVerified){
                return sendResponse(400, 'Email already exists');
            }else{
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new UserModel(
                    {
                        username,
                        email,
                        password: hashedPassword,
                        verifyCode,
                        verifyCodeExpiry: new Date(Date.now() + 60 * 60 * 12)
                    }
                )
                await user.save();
            }
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],
            });

            await newUser.save();
        }

        try {
            await SendEmail({ to_email: email, to_name: username, otp: verifyCode });
            console.log("Email successfully sent!");
            return sendResponse(200, 'Email sent successfully');
        } catch (error) {
            console.error("Error sending email:", error);
            return sendResponse(500, 'Internal Server Error');
        }

    }catch(error){
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log(String(error));
        }
        return sendResponse(500, 'Internal Server Error');
    }
}