export interface PollOption {
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}

// In-memory store (persists until server restarts)
export const polls: Poll[] = [
  {
    id: "test-123",
    question: "What's your favorite framework?",
    options: [
      { text: "Next.js", votes: 5 },
      { text: "Remix", votes: 3 },
      { text: "Nuxt", votes: 2 },
    ],
  },
];