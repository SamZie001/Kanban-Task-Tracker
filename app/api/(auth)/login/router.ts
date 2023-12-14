import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  new NextResponse("Login", { status: 200 });
}
