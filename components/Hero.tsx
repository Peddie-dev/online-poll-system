import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Image
        src="/hero.png"
        alt="Voting illustration"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 flex items-center px-12 bg-black/40">
        <div className="max-w-lg">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            CREATE A POLL
          </h1>
          <p className="mt-4 text-2xl font-semibold text-blue-400 drop-shadow-sm">
            In seconds
          </p>

          <p className="text-white/90 text-lg md:text-xl mt-4 leading-relaxed drop-shadow-sm">
            Want to ask your friends where to go Friday night or arrange a meeting with co-workers?
            Create a poll – and get answers in no time.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-white text-blue-700 rounded-lg font-medium shadow hover:bg-blue-50 transition">
              Create Poll
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition">
              Live Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
