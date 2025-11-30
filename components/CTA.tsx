export default function CTA() {
  return (
    <section className="bg-blue-600 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Text Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to get Started?</h2>
          <p className="text-black text-lg font-bold mt-1">It's free!</p>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            Create Poll
          </button>
          <button className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>

      </div>
    </section>
  );
}
