import path from "path";
import fs from "fs";
import { TicketType } from "@/types";
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "data", "tickets.json");

export async function PUT(req: Request, _res: NextApiResponse) {
  if (req.method === "PUT") {
    const {
      description: reqDesc = "",
      assigneeId: reqAssigneeId = 0,
      id: reqId = 0,
      completed: reqCompleted,
    } = await req.json();

    // Read the existing tickets from the JSON file
    const fileContent = fs.readFileSync(filePath, "utf8");
    const tickets: TicketType[] = JSON.parse(fileContent);
    const needUpdateTicketIdx = tickets.findIndex(({ id }) => reqId === id);

    if (needUpdateTicketIdx === -1)
      return NextResponse.json(
        {
          message: "Can not find available ticket",
        },
        { status: 200 }
      );

    const updateTicket: TicketType = {
      ...tickets[needUpdateTicketIdx],
      description: reqDesc || tickets[needUpdateTicketIdx].description,
      assigneeId: reqAssigneeId || tickets[needUpdateTicketIdx].assigneeId,
      completed: reqCompleted === "done",
    };

    // Update ticket into list
    const newTickets = [
      ...tickets.slice(0, needUpdateTicketIdx),
      updateTicket,
      ...tickets.slice(needUpdateTicketIdx + 1, tickets.length),
    ];

    // Write the updated list back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(newTickets, null, 2));

    return NextResponse.json(updateTicket, { status: 200 });
  }
}
