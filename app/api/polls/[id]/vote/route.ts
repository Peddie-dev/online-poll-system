import { NextRequest, NextResponse } from "next/server";
import { polls } from "@/lib/polls";

// GET /api/polls/[id] - Get single poll
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  console.log("GET /api/polls/" + id);
  console.log("Available polls:", polls.map(p => p.id));
  
  const poll = polls.find(p => p.id === id);
  
  if (!poll) {
    return NextResponse.json(
      { error: "Poll not found", availableIds: polls.map(p => p.id) },
      { status: 404 }
    );
  }
  
  return NextResponse.json(poll);
}

// POST /api/polls/[id] - Vote on poll
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { optionIndex } = await req.json();

  const poll = polls.find(p => p.id === id);
  
  if (!poll) {
    return NextResponse.json({ error: "Poll not found" }, { status: 404 });
  }
  
  if (optionIndex < 0 || optionIndex >= poll.options.length) {
    return NextResponse.json({ error: "Invalid option" }, { status: 400 });
  }

  poll.options[optionIndex].votes += 1;
  return NextResponse.json(poll);
}
