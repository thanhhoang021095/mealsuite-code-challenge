import path from "path";
import fs from "fs";
import { TicketType } from "@/types";
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "data", "tickets.json");

export async function PUT(
  req: Request,
  { params }: { params: { ticketId: string; userId: string } }
) {
  const { ticketId, userId } = params;

  if (req.method === "PUT" && userId && ticketId) {
    // Read the existing tickets from the JSON file
    const fileContent = fs.readFileSync(filePath, "utf8");
    const tickets: TicketType[] = JSON.parse(fileContent);
    const needUpdateTicketIdx = tickets.findIndex(
      ({ id }) => parseInt(ticketId) === id
    );

    if (needUpdateTicketIdx === -1)
      return NextResponse.json(
        {
          message: "Can not find available ticket",
        },
        { status: 200 }
      );

    const updateTicket: TicketType = {
      ...tickets[needUpdateTicketIdx],
      assigneeId: parseInt(userId) || tickets[needUpdateTicketIdx].assigneeId,
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
