import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const users = await 
  } catch (error) {
    console.log(error)
    return res.status(400).end();
  }
}
