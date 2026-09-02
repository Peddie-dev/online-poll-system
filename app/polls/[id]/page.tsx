// app/polls/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoll, voteOnPoll } from "../../../store/slices/pollsSlice";
import type { RootState, AppDispatch } from "../../../store/store";

export default function PollPage() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { current: poll, loading, error } = useSelector((state: RootState) => state.polls);

  // selectedOption stores the Option's database ID
  const [selectedOption, setSelectedOption] = useState<number | null>(null); 
  const [voted, setVoted] = useState(false);

  // Safely extract pollId (should be string, representing the Poll's database ID)
  const pollId = typeof params?.id === 'string' 
    ? params.id 
    : Array.isArray(params?.id) 
      ? params.id[0] 
      : null;

  useEffect(() => {
    if (pollId && pollId !== 'undefined') {
      dispatch(fetchPoll(pollId));
    }
  }, [pollId, dispatch]);

  const handleVote = async () => {
    if (selectedOption === null || !pollId) return;
    try {
      // Send optionId (the database ID)
      await dispatch(voteOnPoll({ id: pollId, optionId: selectedOption })).unwrap(); 
      setVoted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      alert("Failed to submit vote: " + message);
    }
  };

  if (!pollId) return <p className="p-6">Invalid poll ID</p>;
  if (loading) return <p className="p-6">Loading poll...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
  // Check if poll is null OR if poll exists but has no options (e.g., deleted options)
  if (!poll || !poll.options) return <p className="p-6">Poll not found or data incomplete.</p>;

  // Use defensive check for reduce()
  const totalVotes = (poll.options ?? []).reduce((sum, o) => sum + (o.votes ?? 0), 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">{poll.question}</h1>

        {!voted ? (
          <div className="space-y-3">
            {/* Defensive check for map() in voting section */}
            {(poll.options ?? []).map((opt) => ( 
              <label
                key={opt.id}
                className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-blue-50"
              >
                <input
                  type="radio"
                  name="pollOption"
                  checked={selectedOption === opt.id} 
                  onChange={() => setSelectedOption(opt.id)} 
                  className="accent-blue-600"
                />
                <span>{opt.text}</span>
              </label>
            ))}

            <button
              onClick={handleVote}
              disabled={selectedOption === null}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Submit Vote
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Defensive check for map() in results section */}
            {(poll.options ?? []).map((opt) => { 
              const votes = opt.votes ?? 0;
              const percent = totalVotes 
                ? ((votes / totalVotes) * 100).toFixed(1) 
                : "0";
              return (
                <div key={opt.id}>
                  <div className="flex justify-between mb-1">
                    <span>{opt.text}</span>
                    <span>{votes} votes ({percent}%)</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div
                      className="h-4 bg-blue-600 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
            <p className="mt-4 font-medium">Total Votes: {totalVotes}</p>
          </div>
        )}
      </div>
    </div>
  );
}