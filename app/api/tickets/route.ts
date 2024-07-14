// app/api/tickets.ts
import { NextApiResponse } from "next";
import ticketsData from "../../../data/tickets.json";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { getDisplayCompleteStatus } from "@/utils/common";

export async function GET(req: NextRequest, _res: NextApiResponse) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("completed");

  if (req.method === "GET") {
    const filterData = ticketsData.filter(({ completed }) => {
      const completedText = getDisplayCompleteStatus(completed);

      if (query === "all") return true;

      return completedText === query;
    });

    return NextResponse.json(filterData, { status: 200 });
  }
}
