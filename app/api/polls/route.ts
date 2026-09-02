// app/api/polls/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

// Helper function to flatten Prisma's nested _count object
const formatPollResponse = (poll: any) => ({
    ...poll,
    options: poll.options.map((option: any) => ({
        id: option.id,
        text: option.text,
        // Flatten the vote count
        votes: option._count.votes, 
    })),
});

// GET /api/polls - List all polls
export async function GET() {
  try {
    const allPolls = await prisma.poll.findMany({
      include: {
        options: {
          include: {
            _count: {
              select: { votes: true }
            }
          }
        }
      }
    });

    const formattedPolls = allPolls.map(formatPollResponse);

    return NextResponse.json(formattedPolls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    return NextResponse.json(
      { error: "Failed to fetch polls" },
      { status: 500 }
    );
  }
}

// POST /api/polls - Create new poll
export async function POST(req: NextRequest) {
  try {
    const { question, options } = await req.json();

    if (!question || !options || !Array.isArray(options) || options.length < 2) {
        return NextResponse.json(
            { error: "Invalid input: Poll requires a question and at least two options." },
            { status: 400 }
        );
    }

    const createdPoll = await prisma.poll.create({
      data: {
        question: question,
        options: {
          create: options.map((text: string) => ({ text: text })),
        },
      },
      include: {
        options: {
            include: {
                _count: {
                    select: { votes: true }
                }
            }
        }
      }
    });
    
    // Format the response before sending it back
    const formattedPoll = formatPollResponse(createdPoll);

    return NextResponse.json(formattedPoll, { status: 201 });
  } catch (error) {
    console.error("Error creating poll:", error);
    return NextResponse.json(
      { error: "Failed to create poll" },
      { status: 500 }
    );
  }
}