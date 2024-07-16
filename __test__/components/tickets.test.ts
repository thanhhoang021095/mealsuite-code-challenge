// app/api/__tests__/tickets.test.ts
import { NextRequest } from "next/server";
import { GET } from "../../app/api/tickets/route";
import ticketsData from "../../data/tickets.json";
import { getDisplayCompleteStatus } from "../../utils/common";
import { NextResponse } from "next/server";

jest.mock("../../utils/common");

describe("GET /api/tickets", () => {
  it("should return all tickets when query is 'all'", async () => {
    const url = new URL("http://localhost/api/tickets?completed=all");
    const req = new NextRequest(url);

    const response = await GET(req, {} as any);
    if (response) {
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json).toEqual(ticketsData);
    }
  });

  it("should return only completed tickets when query is 'completed'", async () => {
    (getDisplayCompleteStatus as jest.Mock).mockImplementation(
      (completed: boolean) => (completed ? "done" : "progressing")
    );
    const url = new URL("http://localhost/api/tickets?completed=all");
    const req = new NextRequest(url);

    const response = await GET(req, {} as any);

    if (response) {
      const json = await response.json();

      const completedTickets = ticketsData.filter(
        (getDisplayCompleteStatus as jest.Mock).mockImplementation(
          (completed: boolean) => (completed ? "done" : "progressing")
        )
      );

      expect(response.status).toBe(200);
      expect(json).toEqual(completedTickets);
    }
  });

  it("should return only progressing tickets when query is 'progressing'", async () => {
    const mockCompletedText = "done";
    const mockInCompletedText = "progressing";

    (getDisplayCompleteStatus as jest.Mock).mockImplementation(
      (completed: boolean) =>
        completed ? mockCompletedText : mockInCompletedText
    );

    const url = new URL("http://localhost/api/tickets?completed=progressing");
    const req = new NextRequest(url);

    const response = await GET(req, {} as any);

    if (response) {
      const json = await response.json();

      const completedTickets = ticketsData.filter(
        ({ completed }) =>
          getDisplayCompleteStatus(completed) === mockCompletedText
      );

      const notCompletedTickets = ticketsData.filter(
        ({ completed }) =>
          getDisplayCompleteStatus(completed) === mockInCompletedText
      );

      expect(response.status).toBe(200);
      expect(json).toEqual(notCompletedTickets);
    }
  });
});
