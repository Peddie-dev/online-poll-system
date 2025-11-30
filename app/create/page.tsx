export default function CreatePollPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Create a New Poll</h1>
      <p className="mb-4 text-gray-600">
        Fill out the form below to create a new poll.
      </p>
      {/* Placeholder form */}
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Poll Title"
          className="border rounded px-4 py-2"
        />
        <textarea
          placeholder="Poll Description"
          className="border rounded px-4 py-2"
        />
        <button className="px-6 py-2 bg-blue-600 text-white rounded">
          Create Poll
        </button>
      </form>
    </div>
  );
}
