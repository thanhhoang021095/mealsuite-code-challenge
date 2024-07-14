// pages/api/tickets.ts
import { NextApiResponse } from "next";
import userData from "../../../data/users.json";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest, _res: NextApiResponse) {
  if (req.method === "GET") {
    return NextResponse.json(userData, { status: 200 });
  }
}
