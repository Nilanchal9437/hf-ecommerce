import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "@/configs";

export async function middleware(request: NextRequest): Promise<unknown> {
  const url = request?.nextUrl?.pathname;

  const token: any = request.cookies.get(cookies.company);

  const AUTH_URL: string = `${process.env.HF_ECOMMERCE_APP_BASE_URL}/login`;

  if (!token?.value && url !== "/login") {
    return NextResponse.redirect(AUTH_URL);
  } else {
    if (!url.includes("/login")) {
      const verifys: any = await jwtVerify(
        token?.value,
        new TextEncoder().encode(`${process.env.JWT_SECRET}`)
      );

      const user: any = JSON.parse(
        request.cookies.get(cookies.user)?.value || ""
      );
      if (
        verifys?.payload?.email &&
        user?.email &&
        user?.email === verifys?.payload?.email
      ) {
        if (url === "/login") {
          return NextResponse.redirect(
            `${process.env.HF_ECOMMERCE_APP_BASE_URL}/`
          );
        } else {
          return NextResponse.next();
        }
      } else {
        const response = NextResponse.redirect(AUTH_URL);

        response.cookies.delete(cookies.company);
        response.cookies.delete(cookies.user);

        return response;
      }
    } else if (url.includes("/login")) {
      return NextResponse.redirect(`${process.env.HF_ECOMMERCE_APP_BASE_URL}/`);
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/country"],
};
