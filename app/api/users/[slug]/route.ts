import { NextApiRequest, NextApiResponse } from "next";
import userData from "../../../../data/users.json";
import { NextResponse } from "next/server";
import { UserType } from "@/types";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const user = userData.find(
    (user: UserType) => user.id === parseInt(slug as string)
  );

  if (req.method === "GET") {
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  }
}
