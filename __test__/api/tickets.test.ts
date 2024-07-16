// __tests__/tickets.test.ts
import { GET } from "../../app/api/tickets/route";
import ticketsData from "../../data/tickets.json";
import { getDisplayCompleteStatus } from "../../utils/common";
import { NextRequest, NextResponse } from "next/server";

jest.mock("../../utils/common");

describe("GET /api/tickets", () => {
  it("should return all tickets when query is 'all'", async () => {
    const req = {
      method: "GET",
      nextUrl: {
        searchParams: new URLSearchParams("completed=all"),
      },
    } as unknown as NextRequest;

    const jsonSpy = jest.spyOn(NextResponse, "json");

    await GET(req, {} as any);

    expect(jsonSpy).toHaveBeenCalledWith(ticketsData, { status: 200 });
  });

  it("should filter tickets based on completed status", async () => {
    const req = {
      method: "GET",
      nextUrl: {
        searchParams: new URLSearchParams("completed=true"),
      },
    } as unknown as NextRequest;

    const mockCompletedText = "done";
    (getDisplayCompleteStatus as jest.Mock).mockReturnValue(mockCompletedText);

    const jsonSpy = jest.spyOn(NextResponse, "json");

    await GET(req, {} as any);

    const expectedData = ticketsData.filter(
      ({ completed }) =>
        getDisplayCompleteStatus(completed) === mockCompletedText
    );

    expect(jsonSpy).toHaveBeenCalledWith(expectedData, { status: 200 });
  });

  it("should return 200 status code", async () => {
    const req = {
      method: "GET",
      nextUrl: {
        searchParams: new URLSearchParams("completed=all"),
      },
    } as unknown as NextRequest;

    const jsonSpy = jest.spyOn(NextResponse, "json");

    await GET(req, {} as any);

    expect(jsonSpy.mock.calls[0][1]).toEqual({ status: 200 });
  });
});
