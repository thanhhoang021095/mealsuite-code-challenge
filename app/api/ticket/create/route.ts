import path from "path";
import fs from "fs";
import { TicketType } from "@/types";
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "data", "tickets.json");

export async function POST(req: Request, _res: NextApiResponse) {
  if (req.method === "POST") {
    const { description = "", assigneeId = 0 } = await req.json();

    // Read the existing tickets from the JSON file
    const fileContent = fs.readFileSync(filePath, "utf8");
    const tickets: TicketType[] = JSON.parse(fileContent);

    const newTicket: TicketType = {
      id: tickets.length + 1,
      description,
      assigneeId,
      completed: false,
    };

    // Add the new ticket to the list
    tickets.push(newTicket);

    // Write the updated list back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(tickets, null, 2));

    return NextResponse.json(
      {
        message: "success",
      },
      { status: 200 }
    );
  }
}
