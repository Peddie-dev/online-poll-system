export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      
      {/* Page Heading */}
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="text-gray-700 font-medium mt-1">Welcome Back, Richard</p>
      <p className="text-gray-500 mt-1">Your created polls and voting history</p>

      {/* Poll Card */}
      <div className="mt-8">
        <div className="bg-white w-64 p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-800">How do you drink coffee?</h3>
          <p className="text-sm text-gray-600 mt-1">Votes: 120</p>

          <div className="flex gap-3 mt-4">
            <button className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition">
              Edit
            </button>
            <button className="px-4 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition">
              Delete
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
