import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/uk" || pathname.startsWith("/uk/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/uk(?=\/|$)/, "/ua");
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(ua|ru|en|uk)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
