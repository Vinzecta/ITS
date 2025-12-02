export default function InvalidUser() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-xl !p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          Your account is invalid or you are not allowed to access this page.
        </p>
        <a
          href="/login"
          className="inline-block !px-6 !py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go back to Login
        </a>
      </div>
    </div>
  );
}
