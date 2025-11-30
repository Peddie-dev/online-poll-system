export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="mb-4 text-gray-600">Have questions? Get in touch with us.</p>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border rounded px-4 py-2"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border rounded px-4 py-2"
        />
        <textarea
          placeholder="Your Message"
          className="border rounded px-4 py-2"
        />
        <button className="px-6 py-2 bg-blue-600 text-white rounded">
          Send Message
        </button>
      </form>
    </div>
  );
}
