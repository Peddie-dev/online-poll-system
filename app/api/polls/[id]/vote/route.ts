// app/api/polls/[id]/vote/route.ts

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

// POST /api/polls/[id]/vote - Submit a vote
export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const pollId = parseInt(context.params.id, 10);
  const { optionId } = await req.json();

  if (isNaN(pollId) || typeof optionId !== "number") {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  try {
    // Ensure option belongs to this poll
    const option = await prisma.pollOption.findFirst({
      where: { id: optionId, pollId },
    });

    if (!option) {
      return NextResponse.json(
        { error: "Option does not belong to this poll." },
        { status: 404 }
      );
    }

    // Save vote
    await prisma.vote.create({
      data: { optionId },
    });

    // Fetch updated poll
    const updatedPoll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        options: {
          include: {
            _count: { select: { votes: true } },
          },
        },
      },
    });

    if (!updatedPoll) {
      return NextResponse.json(
        { error: "Updated poll not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(formatPollResponse(updatedPoll));
  } catch (error) {
    console.error("Error submitting vote:", error);
    return NextResponse.json(
      { error: "Failed to submit vote" },
      { status: 500 }
    );
  }
}

