"use server";

import { cookies } from "next/headers";

export async function getSession() {
  let session = cookies().get("token");
  console.log(session);
  return session;
}
