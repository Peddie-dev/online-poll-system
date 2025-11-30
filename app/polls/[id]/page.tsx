"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoll, voteOnPoll, updateCurrent } from "../../../store/slices/pollsSlice";
import type { AppDispatch, RootState } from "../../../store/store";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import io from "socket.io-client";

export default function PollDetails() {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch<AppDispatch>();
  const { current } = useSelector((s: RootState) => s.polls);

  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    dispatch(fetchPoll(id));
    // try socket.io connection (update URL to your server)
    try {
      socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || "", { transports: ["websocket"] });
      socketRef.current.on("connect", () => setSocketConnected(true));
      socketRef.current.emit("joinPoll", id);
      socketRef.current.on("pollUpdated", (updatedPoll: any) => {
        dispatch(updateCurrent(updatedPoll));
      });
    } catch (e) {
      console.warn("Socket not available, will fallback to polling.");
    }

    const polling = setInterval(() => dispatch(fetchPoll(id)), 3000);
    return () => {
      clearInterval(polling);
      if (socketRef.current) {
        socketRef.current.emit("leavePoll", id);
        socketRef.current.disconnect();
      }
    };
  }, [dispatch, id]);

  const labels = current?.options.map((o) => o.text) || [];
  const data = {
    labels,
    datasets: [{ data: current?.options.map((o) => o.votes) || [], backgroundColor: ["#2563eb","#ef4444","#f59e0b","#10b981","#8b5cf6"] }],
  };

  const onVote = async (index: number) => {
    try {
      await dispatch(voteOnPoll({ id, optionIndex: index })).unwrap();
    } catch (err) {
      alert("Vote failed: " + String(err));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {!current ? <p>Loading poll...</p> : (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{current.question}</h2>

          {/* chart */}
          <div className="max-w-sm mx-auto">
            <Pie data={data} />
          </div>

          {/* options */}
          <div className="mt-6 grid gap-3">
            {current.options.map((opt, idx) => (
              <button key={idx} onClick={() => onVote(idx)}
                className="text-left px-4 py-3 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-100">
                <div className="flex justify-between">
                  <span>{opt.text}</span>
                  <span className="text-sm text-gray-600">{opt.votes} votes</span>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-500">Realtime: {socketConnected ? "Socket" : "Polling"}</p>
        </div>
      )}
    </div>
  );
}
