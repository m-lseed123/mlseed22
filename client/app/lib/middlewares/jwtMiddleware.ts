import { VerifyToken } from "../auth/verifyAuth";
import { NextRequest, NextResponse } from "next/server";

export async function jwtMiddleware(req: NextRequest) {
  if (checkPath(req)) return;
  const id = VerifyToken();
  req.headers.set("userId", id);
}

function checkPath(req: NextRequest) {
  const publicPaths = [
    "POST:/api/auth/login",
    "POST:/api/auth/logout",
    "POST:/api/auth/register",
  ];
  return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`);
}
