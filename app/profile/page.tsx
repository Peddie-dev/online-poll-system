export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <p className="text-gray-600">Manage your polls and account settings here.</p>
      {/* Placeholder for profile info */}
      <div className="mt-6 border p-6 rounded shadow-sm">
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
