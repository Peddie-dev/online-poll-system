import Link from "next/link";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-500 text-white py-14 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src="/icon.png" className="w-10 h-10" alt="StreamPoll Logo" />
            <h1 className="font-bold text-2xl tracking-wide">StreamPoll</h1>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            Simple and secure polls designed for fast and powerful participation.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Links</h3>
          <ul className="flex flex-col gap-2">
            <Link href="/create" className="hover:text-white/90 text-white/80 transition">
              Create Poll
            </Link>
            <Link href="/profile" className="hover:text-white/90 text-white/80 transition">
              Profile
            </Link>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Company</h3>
          <ul className="flex flex-col gap-2">
            <Link href="/about" className="hover:text-white/90 text-white/80 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-white/90 text-white/80 transition">
              Contact
            </Link>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-3 md:items-end">
          <h3 className="font-semibold mb-3 text-lg">Follow Us</h3>
          <div className="flex gap-5 text-white">
            <a href="#" className="hover:text-blue-200 transition transform hover:scale-110">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-blue-200 transition transform hover:scale-110">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="hover:text-blue-200 transition transform hover:scale-110">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-sm text-white/70 border-t border-white/20 pt-6">
        &copy; {new Date().getFullYear()} StreamPoll. All rights reserved.
      </div>
    </footer>
  );
}

