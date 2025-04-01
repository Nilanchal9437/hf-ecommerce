import { NextResponse } from "next/server";
import { cookies } from "@/configs";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const response = NextResponse.json(
    {
      status: true,
      message: "logout successfully",
    },
    { status: 200 }
  );

  response.cookies.delete(cookies.company);
  response.cookies.delete(cookies.user);

  return response;
}
