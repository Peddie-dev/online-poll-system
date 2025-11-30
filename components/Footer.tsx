import Link from "next/link";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-500 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src="/icon.png" className="w-8 h-8" alt="StreamPoll Logo" />
            <h1 className="font-bold text-2xl">StreamPoll</h1>
          </div>
          <p className="text-gray-200 text-sm">
            Simple and secure polls for everyone.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Links</h3>
          <ul className="flex flex-col gap-2">
            <Link href="/create" className="text-black hover:text-white transition">
              Create Poll
            </Link>
            <Link href="/profile" className="text-black hover:text-white transition">
              Profile
            </Link>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Company</h3>
          <ul className="flex flex-col gap-2">
            <Link href="/about" className="text-black hover:text-white transition">
              About
            </Link>
            <Link href="/contact" className="text-black hover:text-white transition">
              Contact
            </Link>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-3 md:items-end">
          <h3 className="font-semibold mb-2 text-white">Follow Us</h3>
          <div className="flex gap-4 text-white">
            <a href="#" className="hover:text-blue-300 transition transform hover:scale-110">
              <FaTwitter size={22} />
            </a>
            <a href="#" className="hover:text-blue-300 transition transform hover:scale-110">
              <FaFacebookF size={22} />
            </a>
            <a href="#" className="hover:text-blue-300 transition transform hover:scale-110">
              <FaInstagram size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-sm text-white/70">
        &copy; {new Date().getFullYear()} StreamPoll. All rights reserved.
      </div>
    </footer>
  );
}
