export default function PollsList() {
  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-center text-2xl md:text-3xl font-bold">Active Polls</h2>
      <p className="text-center text-gray-500 mt-2 text-sm md:text-base">
        Browse and vote on trending polls
      </p>

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <input
          placeholder="Search polls..."
          className="w-[60%] md:w-[40%] border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Poll Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-6 md:px-12">
        
        {/* Poll Card 1 */}
        <div className="border p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition hover:scale-105">
          <h3 className="font-semibold text-lg">Best Programming Language?</h3>
          <p className="text-gray-500 mt-2 text-sm">Vote for your favourite programming language</p>

          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
              Vote
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              View Results
            </button>
          </div>
        </div>

        {/* Poll Card 2 */}
        <div className="border p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition hover:scale-105">
          <h3 className="font-semibold text-lg">Favorite Frontend Framework?</h3>
          <p className="text-gray-500 mt-2 text-sm">React, Vue, Angular? Cast your vote!</p>

          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
              Vote
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              View Results
            </button>
          </div>
        </div>

        {/* Poll Card 3 */}
        <div className="border p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition hover:scale-105">
          <h3 className="font-semibold text-lg">Best Remote Work Setup?</h3>
          <p className="text-gray-500 mt-2 text-sm">Choose the setup that boosts your productivity</p>

          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
              Vote
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              View Results
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
