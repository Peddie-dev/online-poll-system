// app/api/polls/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const formatPollResponse = (poll: any) => ({
  ...poll,
  options: poll.options.map((option: any) => ({
    id: option.id,
    text: option.text,
    votes: option._count.votes,
  })),
});

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const pollId = parseInt(context.params.id, 10);

  if (isNaN(pollId)) {
    return NextResponse.json({ error: "Invalid poll ID" }, { status: 400 });
  }

  try {
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        options: {
          include: {
            _count: { select: { votes: true } },
          },
        },
      },
    });

    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    return NextResponse.json(formatPollResponse(poll));
  } catch (error) {
    console.error("Error fetching poll:", error);
    return NextResponse.json(
      { error: "Failed to fetch poll" },
      { status: 500 }
    );
  }
}
