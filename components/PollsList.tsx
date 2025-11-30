"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolls } from "../store/slices/pollsSlice";
import type { RootState, AppDispatch } from "../store/store";
import Link from "next/link";

export default function PollsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((s: RootState) => s.polls);

  useEffect(() => { dispatch(fetchPolls()); }, [dispatch]);

  return (
    <section className="py-12">
      <h2 className="text-center text-2xl font-semibold">Active Polls</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-6">
        {loading && <p>Loading...</p>}
        {list.map((p) => (
          <div key={p.id} className="border p-6 rounded-xl shadow-sm bg-white">
            <h3 className="font-semibold text-lg">{p.question}</h3>
            <p className="text-sm text-gray-500 mt-2">{p.options.reduce((a,b)=>a+b.votes,0)} votes</p>

            <div className="flex gap-3 mt-4">
              <Link href={`/polls/${p.id}`} className="px-3 py-2 bg-blue-600 text-white rounded-md">View / Vote</Link>
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-md">Share</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
