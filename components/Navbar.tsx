"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/icon.png" className="w-8 h-8" alt="StreamPoll Logo" />
          <h1 className="font-bold text-xl">StreamPoll</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-blue-200 transition-colors font-medium">Home</Link>
          <Link href="/create" className="hover:text-blue-200 transition-colors font-medium">Create Poll</Link>
          <Link href="/profile" className="hover:text-blue-200 transition-colors font-medium">Profile</Link>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <button className="px-5 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg font-medium shadow transition">
            Login
          </button>
          <button className="px-5 py-2 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-medium shadow transition">
            Sign up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-blue-700 p-6 rounded-xl flex flex-col gap-6 animate-slide-down">
          <Link href="/" className="hover:text-blue-200 transition-colors font-medium">Home</Link>
          <Link href="/create" className="hover:text-blue-200 transition-colors font-medium">Create Poll</Link>
          <Link href="/profile" className="hover:text-blue-200 transition-colors font-medium">Profile</Link>

          <button className="w-full px-5 py-3 bg-blue-500 hover:bg-blue-400 rounded-lg font-medium shadow transition">
            Login
          </button>
          <button className="w-full px-5 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-medium shadow transition">
            Sign up
          </button>
        </div>
      )}
    </nav>
  );
}
