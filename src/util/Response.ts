import { NextResponse } from "next/server";

export const sendResponse = (status : number, message = '' , data = {}) => {
  NextResponse.json(
    {
      status,
      message,
      data,
    }
  );
};