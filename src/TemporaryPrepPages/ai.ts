/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import axios from "axios";

const GeminiURI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API}`;

export const getGeminiContent = async () => {
    try {
        const data = {
            prompt: {
                text: "What is NextJS 15?",
            },
        };

        const response = await axios.post(GeminiURI, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Gemini API Response:", response.data);

        return NextResponse.json({
            status: 200,
            message: "Success",
            data: response.data,
        });
    } catch (error: any) {
        console.error("Error fetching content from Gemini API:", error.message);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
