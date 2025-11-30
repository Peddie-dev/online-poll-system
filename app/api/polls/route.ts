import { NextRequest, NextResponse } from "next/server";
import { polls } from "@/lib/polls";

// GET /api/polls - List all polls
export async function GET() {
  return NextResponse.json(polls);
}

// POST /api/polls - Create new poll
export async function POST(req: NextRequest) {
  const { question, options } = await req.json();
  
  const newPoll = {
    id: crypto.randomUUID(),
    question,
    options: options.map((text: string) => ({ text, votes: 0 })),
  };
  
  polls.push(newPoll);
  return NextResponse.json(newPoll, { status: 201 });
}