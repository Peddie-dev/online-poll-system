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

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);

  // Safely extract pollId
  const pollId = typeof params?.id === 'string' 
    ? params.id 
    : Array.isArray(params?.id) 
      ? params.id[0] 
      : null;

  useEffect(() => {
    // Only fetch if pollId is a valid non-empty string
    if (pollId && pollId !== 'undefined') {
      dispatch(fetchPoll(pollId));
    }
  }, [pollId, dispatch]);

  const handleVote = async () => {
    if (selectedOption === null || !pollId) return;
    try {
      await dispatch(voteOnPoll({ id: pollId, optionIndex: selectedOption })).unwrap();
      setVoted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      alert("Failed to submit vote: " + message);
    }
  };

  // Early returns with better checks
  if (!pollId) return <p className="p-6">Invalid poll ID</p>;
  if (loading) return <p className="p-6">Loading poll...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
  if (!poll) return <p className="p-6">Poll not found</p>;

  const totalVotes = poll.options.reduce((sum, o) => sum + (o.votes ?? 0), 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">{poll.question}</h1>

        {!voted ? (
          <div className="space-y-3">
            {poll.options.map((opt, idx) => (
              <label
                key={idx}
                className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-blue-50"
              >
                <input
                  type="radio"
                  name="pollOption"
                  checked={selectedOption === idx}
                  onChange={() => setSelectedOption(idx)}
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
            {poll.options.map((opt, idx) => {
              // ✅ Fix 3: Consistent null handling
              const votes = opt.votes ?? 0;
              const percent = totalVotes 
                ? ((votes / totalVotes) * 100).toFixed(1) 
                : "0";
              return (
                <div key={idx}>
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