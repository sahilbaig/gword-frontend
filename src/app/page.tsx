"use client";
import LoginPage from "./login/page";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="">
      {user ? (
        <div className="p-6 bg-green-500 text-white text-xl rounded-lg">
          <button
            className="mt-4 bg-red-500 px-4 py-2 rounded"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <LoginPage></LoginPage>
      )}
    </div>
  );
}
