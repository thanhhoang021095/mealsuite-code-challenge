// __tests__/ticketsCreate.test.ts
import path from "path";
import fs from "fs";
import { POST } from "../../app/api/ticket/create/route";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { TicketType } from "@/types";

jest.mock("fs");

const filePath = path.join(process.cwd(), "data", "tickets.json");

describe("POST /api/ticket/create", () => {
  it("should create a new ticket", async () => {
    const req = {
      method: "POST",
      json: jest
        .fn()
        .mockResolvedValue({ description: "New ticket", assigneeId: 1 }),
    } as unknown as NextRequest;

    const existingTickets: TicketType[] = [
      { id: 1, description: "First ticket", assigneeId: 1, completed: false },
      { id: 2, description: "Second ticket", assigneeId: 2, completed: false },
    ];

    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify(existingTickets)
    );
    const writeFileSyncMock = (
      fs.writeFileSync as jest.Mock
    ).mockImplementation(() => {});

    const jsonSpy = jest.spyOn(NextResponse, "json");

    await POST(req, {} as any);

    const newTicket: TicketType = {
      id: existingTickets.length + 1,
      description: "New ticket",
      assigneeId: 1,
      completed: false,
    };

    const updatedTickets = [...existingTickets, newTicket];

    expect(writeFileSyncMock).toHaveBeenCalledWith(
      filePath,
      JSON.stringify(updatedTickets, null, 2)
    );
    expect(jsonSpy).toHaveBeenCalledWith(
      { message: "success" },
      { status: 200 }
    );
  });

  it("should return 200 status code", async () => {
    const req = {
      method: "POST",
      json: jest
        .fn()
        .mockResolvedValue({ description: "New ticket", assigneeId: 1 }),
    } as unknown as NextRequest;

    const existingTickets: TicketType[] = [
      { id: 1, description: "First ticket", assigneeId: 1, completed: false },
      { id: 2, description: "Second ticket", assigneeId: 2, completed: false },
    ];

    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify(existingTickets)
    );
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    const jsonSpy = jest.spyOn(NextResponse, "json");

    await POST(req, {} as any);

    expect(jsonSpy.mock.calls[0][1]).toEqual({ status: 200 });
  });
});
