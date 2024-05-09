import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/app/actions";
export async function getUser(token) {
  const data = await getDataFromToken();
  console.log("token : ", data);
  return { name: "fakeuser", lastname: "fake user", token: token };
}
