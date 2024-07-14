import { NextApiRequest } from "next";
import ticketsData from "../../../../data/tickets.json";
import { TicketType } from "@/types";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { ticketId: string } }
) {
  const ticketId = params.ticketId;

  if (req.method === "GET") {
    const ticket = ticketsData.find(
      (ticket: TicketType) => ticket.id === parseInt(ticketId)
    );

    if (!ticket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(ticket, { status: 200 });
  }
}
