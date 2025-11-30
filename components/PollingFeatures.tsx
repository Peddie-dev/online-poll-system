export default function PollingFeatures() {
  return (
    <section className="py-16 bg-white">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold">POLLING MADE EASY</h2>
        <p className="text-blue-600 text-xl mt-2">Simple polls with powerful configuration</p>
        <p className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed">
          While we make our polls as simple and beautiful as possible, we also offer powerful
          customization options to enable on-demand adjustments for many different purposes.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-6 md:px-12">
        
        {/* Feature 1 */}
        <div className="border p-6 rounded-xl shadow-lg hover:shadow-xl transition hover:scale-105 bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Live Results</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Evaluate your poll results in a pie chart or bar graph in real-time.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="border p-6 rounded-xl shadow-lg hover:shadow-xl transition hover:scale-105 bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Deadlines</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Our polls run indefinitely. You can change that by setting a deadline.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="border p-6 rounded-xl shadow-lg hover:shadow-xl transition hover:scale-105 bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Fake Detection</h3>
          <p className="text-gray-600 text-sm md:text-base">
            By default, bots and VPN users are blocked from voting on straw polls.
          </p>
        </div>

      </div>
    </section>
  );
}
