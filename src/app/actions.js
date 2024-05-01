"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getSession() {
  let session = cookies().get("token");
  console.log(session);
  return session;
}

export async function getDataFromToken() {
  try {
    const token = cookies().get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decodedToken;
  } catch (error) {
    throw new Error(error.message);
  }
}
