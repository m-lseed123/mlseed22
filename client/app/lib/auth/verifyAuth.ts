import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function isAuthenticated() {
  try {
    VerifyToken();
    return true;
  } catch {
    return false;
  }
}

export function VerifyToken() {
  const token = cookies().get("auth")?.value ?? "";
  const check = jwt.verify(token, "SECRET");
  const id = check.sub as string;
  return id;
}
