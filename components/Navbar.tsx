import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/icon.png" className="w-8 h-8" />
        <h1 className="font-bold text-xl">StreamPoll</h1>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-8">
        <Link href="/" className="hover:text-blue-200 transition-colors font-medium">
          Home
        </Link>
        <Link href="/create" className="hover:text-blue-200 transition-colors font-medium">
          Create Poll
        </Link>
        <Link href="/profile" className="hover:text-blue-200 transition-colors font-medium">
          Profile
        </Link>
      </ul>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="px-5 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg font-medium shadow transition">
          Login
        </button>
        <button className="px-5 py-2 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-medium shadow transition">
          Sign up
        </button>
      </div>
    </nav>
  );
}
